import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { Deal, DealsDto, Parameter } from '~/types/deals';
import safelyLocalStorage from '~/utils/safely-local-storage';
import BaseController from './BaseController';

export class DealsController extends BaseController {
  async getDeals(): Promise<[Parameter[], Deal[]]> {
    const data = await this.get<DealsDto>('/api/data/get');

    const parameters =
      data.parameters.length > 0 ? data.parameters : this.defaultParameters;
    const deals = Object.values(data.deals);

    return [parameters, deals];
  }

  async getParameters(): Promise<Parameter[]> {
    const parameters = await this.get<Parameter[]>('/api/data_parameters/get');

    return parameters.length > 0 ? parameters : this.defaultParameters;
  }

  async updateDeals(parameters: Parameter[], deals: Deal[]): Promise<void> {
    const data: DealsDto = {
      parameters,
      deals: Object.fromEntries(deals.map((deal) => [deal.id, deal])),
    };

    await this.put<void, DealsDto>('/api/data/set', data);
  }

  async resetDeals(): Promise<void> {
    await this.updateDeals(this.defaultParameters, []);
  }

  protected readonly defaultParameters: Parameter[] = [
    { key: 'name', name: 'Название компании', type: 'string' },
    { key: 'date', name: 'Дата операции', type: 'date' },
    { key: 'strategy', name: 'Стратегия', type: 'string' },
    { key: 'amount', name: 'Объем позиции', type: 'number' },
    { key: 'mart', name: 'Рынок', type: 'string' },
  ];
}

export class MockDealsController extends DealsController {
  override async getDeals(): Promise<[Parameter[], Deal[]]> {
    const parameters = safelyLocalStorage.getJsonOrElse(
      this.parametersKey,
      this.defaultParameters
    );
    const deals = safelyLocalStorage.getJsonOrElse(
      this.dealsKey,
      this.defaultDeals
    );

    return [parameters, deals];
  }

  override async getParameters(): Promise<Parameter[]> {
    const parameters = safelyLocalStorage.getJsonOrElse(
      this.parametersKey,
      this.defaultParameters
    );

    return parameters;
  }

  override async updateDeals(
    parameters: Parameter[],
    deals: Deal[]
  ): Promise<void> {
    safelyLocalStorage.setJson(this.parametersKey, parameters);
    safelyLocalStorage.setJson(this.dealsKey, deals);
    console.log('Updated deals');
  }

  override async resetDeals(): Promise<void> {
    await this.updateDeals(this.defaultParameters, this.defaultDeals);
  }

  private readonly dealsKey = 'deals-page:deals';
  private readonly defaultDeals: Deal[] = [
    {
      id: uuidV4(),
      name: 'INTC',
      date: dayjs().format('M/DD/YY'),
      strategy: 'Восходящий клин',
      amount: 200,
      market: 'Акции',
    },
    {
      id: uuidV4(),
      name: 'BTC',
      date: dayjs().format('M/DD/YY'),
      strategy: 'Молот',
      amount: 300,
      market: 'Криптовалюта',
    },
  ];

  private readonly parametersKey = 'deals-page:parameters';
}

import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { Deal, Deals, DealsDto, Parameter, ProviderType } from '~/types/deals';
import safelyLocalStorage from '~/utils/safely-local-storage';
import BaseController from './BaseController';

export class DealsController extends BaseController {
  async getDeals(): Promise<Deals> {
    const data = await this.get<DealsDto>('/api/data/get');

    const parameters =
      data.parameters.length > 0 ? data.parameters : this.defaultParameters;
    const deals = Object.values(data.deals);

    if (deals.some((d) => d.date)) {
      const sortedDeals = deals.sort(
        (a, b) =>
          (b?.date ? new Date(b.date).getTime() : 0) -
          (a?.date ? new Date(a.date).getTime() : 0)
      );
      return { parameters, deals: sortedDeals };
    }

    return { parameters, deals };
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
    { key: 'total', name: 'Сумма сделки', type: 'number' },
    { key: 'amount', name: 'Объем позиции', type: 'number' },
    { key: 'date', name: 'Дата операции', type: 'date' },
    { key: 'strategy', name: 'Стратегия', type: 'string' },
    { key: 'mart', name: 'Рынок', type: 'string' },
  ];
}

export class MockDealsController extends DealsController {
  override async getDeals(): Promise<Deals> {
    const parameters = safelyLocalStorage.getJsonOrElse(
      this.parametersKey,
      this.defaultParameters
    );
    const deals = safelyLocalStorage.getJsonOrElse(
      this.dealsKey,
      this.defaultDeals
    );

    return { parameters, deals };
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
  }

  override async resetDeals(): Promise<void> {
    await this.updateDeals(this.defaultParameters, this.defaultDeals);
  }

  private readonly dealsKey = 'deals-page:deals';
  private readonly defaultDeals: Deal[] = [
    {
      id: uuidV4(),
      'provider-type': ProviderType.TradersJournal,
      name: 'INTC',
      date: dayjs().format('M/DD/YY'),
      strategy: 'Восходящий клин',
      amount: 200,
      market: 'Акции',
    },
    {
      id: uuidV4(),
      'provider-type': ProviderType.TradersJournal,
      name: 'BTC',
      date: dayjs().format('M/DD/YY'),
      strategy: 'Молот',
      amount: 300,
      market: 'Криптовалюта',
    },
  ];

  private readonly parametersKey = 'deals-page:parameters';
}

import { Deal, DealsDto, Parameter } from '~/types/deals';
import BaseController from './BaseController';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { v4 as uuidV4 } from 'uuid';

export class DealsController extends BaseController {
  async getDeals(): Promise<[Parameter[], Deal[]]> {
    const data = await this.get<DealsDto>('/api/data/get');

    const parameters =
      data.parameters.length > 0 ? data.parameters : this.defaultParameters;
    const deals = Object.values(data.deals);

    return [parameters, deals];
  }

  async updateDeals(parameters: Parameter[], deals: Deal[]): Promise<void> {
    const data: DealsDto = {
      parameters,
      deals: Object.fromEntries(deals.map((deal) => [deal.id, deal])),
    };

    await this.put<void, DealsDto>('/api/data/add', data);
  }

  async resetDeals(): Promise<void> {
    await this.updateDeals(this.defaultParameters, []);
  }

  protected readonly defaultParameters: Parameter[] = [
    { key: 'name', name: 'Название компании', type: 'string' },
    { key: 'start-date', name: 'Дата входа', type: 'date' },
    { key: 'end-date', name: 'Дата выхода', type: 'date' },
    { key: 'deal-type', name: 'Вид сделки', type: 'string' },
    { key: 'position-volume', name: 'Объем позиции', type: 'number' },
    { key: 'market', name: 'Рынок', type: 'string' },
    { key: 'total', name: 'Итог сделки', type: 'number' },
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
      'start-date': new Date(),
      'end-date': new Date(),
      'deal-type': 'Восходящий клин',
      'position-volume': 200,
      market: 'Акции',
      total: 200,
    },
    {
      id: uuidV4(),
      name: 'BTC',
      'start-date': new Date().toISOString(),
      'end-date': new Date().toISOString(),
      'deal-type': 'Молот',
      'position-volume': 300,
      market: 'Криптовалюта',
      total: -200,
    },
  ];

  private readonly parametersKey = 'deals-page:parameters';
}

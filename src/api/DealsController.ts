import { Deal, DealsDto, Parameter } from '~/types/deals';
import BaseController from './BaseController';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { v4 as uuidV4 } from 'uuid';

export default class DealsController extends BaseController {
  async getDeals(): Promise<[Parameter[], Deal[]]> {
    const data = await this.get<DealsDto>('/api/data/get');

    return [data.parameters, Object.values(data.deals)];
  }

  async updateDeals(parameters: Parameter[], deals: Deal[]): Promise<void> {
    const data: DealsDto = {
      parameters,
      deals: Object.fromEntries(deals.map((deal) => [deal.id, deal])),
    };

    await this.put<void, DealsDto>('/api/data/add', data);
  }
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

  private readonly dealsKey = 'deals-page:deals';
  private readonly defaultDeals: Deal[] = [
    {
      id: uuidV4(),
      name: 'INTC',
      startDate: new Date(),
      endDate: new Date(),
      strategy: 'Восходящий клин',
      mark: 'RSI',
      sector: 'Технологии',
      positionVolume: 200,
      market: 'Акции',
      income: 200,
      factor: 4,
      accuracy: 100,
    },
    {
      id: uuidV4(),
      name: 'BTC',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      strategy: 'Молот',
      positionVolume: 300,
      market: 'Криптовалюта',
      income: -200,
      factor: -2,
      accuracy: 50,
    },
  ];

  private readonly parametersKey = 'deals-page:parameters';
  private readonly defaultParameters: Parameter[] = [
    { key: 'name', name: 'Наименование', type: 'string' },
    { key: 'startDate', name: 'Дата входа', type: 'date' },
    { key: 'endDate', name: 'Дата выхода', type: 'date' },
    { key: 'strategy', name: 'Стратегий', type: 'string' },
    { key: 'mark', name: 'Показатель', type: 'string' },
    { key: 'sector', name: 'Сектор', type: 'string' },
    { key: 'positionVolume', name: 'Объем позиции', type: 'number' },
    { key: 'market', name: 'Рынок', type: 'string' },
    { key: 'income', name: 'Доход', type: 'number' },
    { key: 'factor', name: 'Factor', type: 'number' },
    { key: 'accuracy', name: 'Точность', type: 'number' },
  ];
}

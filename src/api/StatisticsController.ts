import { Statistics, StatisticsDto } from '~/types/statistics';
import BaseController from './BaseController';

export class StatisticsController extends BaseController {
  async getStatistics(): Promise<Statistics> {
    const data = await this.get<StatisticsDto>('/api/stat/get');

    const normalizedData = Object.fromEntries(
      Object.entries(data).map<[string, Statistics[string]]>(([key, value]) => {
        type Item = Statistics[string][number];
        const normalizedValue = Object.entries(value).map<Item>(([k, v]) => ({
          name: k,
          accuracy: v.accuracy * 100,
          profitability: v.profit,
          volume: v.value,
        }));

        return [key, normalizedValue];
      })
    );

    return normalizedData;
  }
}

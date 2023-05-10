import { Recommendation } from '~/types/recommendations';
import snakeToCamel from '~/utils/snake-to-camel';
import BaseController from './BaseController';

export class RecommendationsController extends BaseController {
  async getRecommendations(
    startDate: Date,
    endDate: Date,
    parameterKeys: string[]
  ): Promise<Recommendation[]> {
    try {
      const data = await this.get<Recommendation[]>('/api/rec/get');
      const normalizedData = data.map((r) =>
        Object.fromEntries(
          Object.entries(r).map(([key, value]) => [snakeToCamel(key), value])
        )
      ) as Recommendation[];
      return normalizedData;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
}

export class MockRecommendationsController extends RecommendationsController {
  override async getRecommendations(
    startDate: Date,
    endDate: Date,
    parameterKeys: string[]
  ): Promise<Recommendation[]> {
    return this.mockData;
  }

  private readonly mockData: Recommendation[] = [
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'CETS',
      name: 'CNYRUB_TOM',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 360254.4,
      analyticsCountPlus: 6,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'CNGD',
      name: 'CNYRUB_TOM',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 291541.9585,
      analyticsCountPlus: 6,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'CNGD',
      name: 'USD000000TOD',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 9908.42,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'CNGD',
      name: 'USD000UTSTOM',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 142545.625,
      analyticsCountPlus: 2,
      analyticsCountMinus: 4,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'PSRP',
      name: 'TRUR',
      broker: '\u0422\u0411',
      analyticsSum: 979.761,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'SPBFUT',
      name: 'SIM2',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 8531280.0,
      analyticsCountPlus: 48,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'SPBFUT',
      name: 'SIU2',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 4677600.0,
      analyticsCountPlus: 2,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'AFLT',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 16197.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 1,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'FIVE',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 34626.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'MGNT',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 79442.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 4,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'MOEX',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 184432.0,
      analyticsCountPlus: 3,
      analyticsCountMinus: 5,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'SBER',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 297694.8,
      analyticsCountPlus: 4,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u041c\u041c\u0412\u0411',
      tradingMode: 'TQBR',
      name: 'VKCO',
      broker: '\u041d\u041a\u041e \u041d\u041a\u0426 (\u0410\u041e)',
      analyticsSum: 409982.2,
      analyticsCountPlus: 13,
      analyticsCountMinus: 7,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'AAPL',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 13536.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'AIG',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 39897.6,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'BABA',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 21984.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'CL',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 11902.4,
      analyticsCountPlus: 1,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'MAT',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 42796.8,
      analyticsCountPlus: 1,
      analyticsCountMinus: 4,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'MDLZ',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 14676.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'META',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 17456.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'PYPL',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 19072.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'SYF',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 42332.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 4,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'T',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 15353.6,
      analyticsCountPlus: 1,
      analyticsCountMinus: 2,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'TOL',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 33199.2,
      analyticsCountPlus: 1,
      analyticsCountMinus: 3,
    },
    {
      marketplace: '\u0421\u041f\u0411',
      tradingMode: 'SPBXM',
      name: 'ZM',
      broker: '\u0421\u041f\u0411 \u041a\u043b\u0438\u0440\u0438\u043d\u0433',
      analyticsSum: 19632.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 4,
    },
  ];
}

import {
  Recommendation,
  RecommendationsResponse,
} from '~/types/recommendations';
import BaseController from './BaseController';

export class RecommendationsController extends BaseController {
  async getRecommendations(): Promise<Recommendation[]> {
    try {
      const response = await this.get<RecommendationsResponse>('/api/rec/get');
      return response.data;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }
}

export class MockRecommendationsController extends RecommendationsController {
  async getRecommendations(): Promise<Recommendation[]> {
    return this.mockData;
  }

  private readonly mockData: Recommendation[] = [
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'CETS',
      name: 'CNYRUB_TOM',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 360254.4,
      analyticsCountPlus: 6,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'CNGD',
      name: 'CNYRUB_TOM',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 291541.9585,
      analyticsCountPlus: 6,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'CNGD',
      name: 'USD000000TOD',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 9908.42,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'CNGD',
      name: 'USD000UTSTOM',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 142545.625,
      analyticsCountPlus: 2,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'PSRP',
      name: 'TRUR',
      borker: '\\u0422\\u0411',
      analyticsSum: 979.761,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'SPBFUT',
      name: 'SIM2',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 853901280.0,
      analyticsCountPlus: 48,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'SPBFUT',
      name: 'SIU2',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 4677600.0,
      analyticsCountPlus: 2,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'AFLT',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 16197.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'FIVE',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 34626.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'MGNT',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 79442.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'MOEX',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 184432.0,
      analyticsCountPlus: 3,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'SBER',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 297694.8,
      analyticsCountPlus: 4,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\\u041c\\u041c\\u0412\\u0411',
      tradingMode: 'TQBR',
      name: 'VKCO',
      borker: '\\u041d\\u041a\\u041e \\u041d\\u041a\\u0426 (\\u0410\\u041e)',
      analyticsSum: 409982.2,
      analyticsCountPlus: 13,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'AAPL',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 13536.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      marketplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'AIG',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 39897.6,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'BABA',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 21984.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'CL',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 11902.4,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'MAT',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 42796.8,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'MDLZ',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 14676.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'META',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 17456.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'PYPL',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 19072.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'SYF',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 42332.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'T',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 15353.6,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'TOL',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 33199.2,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
    {
      markerplace: '\\u0421\\u041f\\u0411',
      tradingMode: 'SPBXM',
      name: 'ZM',
      borker:
        '\\u0421\\u041f\\u0411 \\u041a\\u043b\\u0438\\u0440\\u0438\\u043d\\u0433',
      analyticsSum: 19632.0,
      analyticsCountPlus: 1,
      analyticsCountMinus: 0,
    },
  ];
}

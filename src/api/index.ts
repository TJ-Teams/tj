import { DealsController, MockDealsController } from './DealsController';
import {
  MockRecommendationsController,
  RecommendationsController,
} from './RecommendationsController';
import { StatisticsController } from './StatisticsController';

type Api = {
  deals: DealsController;
  recommendations: RecommendationsController;
  statistics: StatisticsController;
};

const api: Api = {
  deals: import.meta.env.VITE_OFFLINE
    ? new MockDealsController()
    : new DealsController(),
  recommendations: import.meta.env.VITE_OFFLINE
    ? new MockRecommendationsController()
    : new RecommendationsController(),
  statistics: new StatisticsController(),
};

export default api;

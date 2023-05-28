import { DealsController, MockDealsController } from './DealsController';
import {
  MockRecommendationsController,
  RecommendationsController,
} from './RecommendationsController';
import { StatisticsController } from './StatisticsController';
import { UserController } from './UserController';

type Api = {
  deals: DealsController;
  recommendations: RecommendationsController;
  statistics: StatisticsController;
  user: UserController;
};

const api: Api = {
  deals: import.meta.env.VITE_OFFLINE
    ? new MockDealsController()
    : new DealsController(),
  recommendations: import.meta.env.VITE_OFFLINE
    ? new MockRecommendationsController()
    : new RecommendationsController(),
  statistics: new StatisticsController(),
  user: new UserController(),
};

export default api;

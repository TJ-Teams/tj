import { DealsController, MockDealsController } from './DealsController';
import {
  MockRecommendationsController,
  RecommendationsController,
} from './RecommendationsController';

type Api = {
  deals: DealsController;
  recommendations: RecommendationsController;
};

const api: Api = {
  deals: import.meta.env.VITE_OFFLINE
    ? new MockDealsController()
    : new DealsController(),
  recommendations: import.meta.env.VITE_OFFLINE
    ? new MockRecommendationsController()
    : new RecommendationsController(),
};

export default api;

import { DealsController, MockDealsController } from './DealsController';

type Api = {
  deals: DealsController;
};

const api: Api = {
  deals: import.meta.env.VITE_OFFLINE
    ? new MockDealsController()
    : new DealsController(),
};

export default api;

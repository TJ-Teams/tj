import DealsController, { MockDealsController } from './DealsController';

export default {
  deals: import.meta.env.VITE_OFFLINE
    ? new MockDealsController()
    : new DealsController(),
};

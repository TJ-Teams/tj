import DealsPage from './DealsPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import paths from './paths';
import RecommendationsPage from './RecommendationsPage';
import RegisterPage from './RegisterPage';
import StatsPage from './StatsPage';

export default {
  login: {
    path: paths.login.path,
    Component: LoginPage,
  },
  register: {
    path: paths.register.path,
    Component: RegisterPage,
  },
  deals: {
    path: paths.deals.path,
    Component: DealsPage,
  },
  stats: {
    path: paths.stats.path,
    Component: StatsPage,
  },
  recommendations: {
    path: paths.recommendations.path,
    Component: RecommendationsPage,
  },
  main: {
    path: paths.main.path,
    Component: MainPage,
  },
};

import DealsPage from './DealsPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import paths from './paths';
import RegisterPage from './RegisterPage';

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
  main: {
    path: paths.main.path,
    Component: MainPage,
  },
};

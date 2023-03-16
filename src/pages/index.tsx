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
  main: {
    path: paths.main.path,
    Component: MainPage,
  },
};

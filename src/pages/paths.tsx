export default {
  login: {
    path: '/login',
    makePath: () => '/login',
  },
  register: {
    path: '/register',
    makePath: () => '/register',
  },
  main: {
    path: '/*',
    makePath: () => '/',
  },
};

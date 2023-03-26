export default {
  login: {
    path: '/login',
    makePath: () => '/login',
  },
  register: {
    path: '/register',
    makePath: () => '/register',
  },
  deals: {
    path: '/deals',
    makePath: () => '/deals',
  },
  main: {
    path: '/*',
    makePath: () => '/',
  },
};

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
  stats: {
    path: '/stats',
    makePath: () => '/stats',
  },
  recommendations: {
    path: '/recommendations',
    makePath: () => '/recommendations',
  },
  main: {
    path: '/*',
    makePath: () => '/',
  },
};

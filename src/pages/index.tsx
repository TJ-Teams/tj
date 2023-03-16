import { lazy } from 'react';
import paths from './paths';

const MainPage = lazy(() => import('~/App'));

export default {
  main: {
    path: paths.main.path,
    Component: MainPage,
  },
};

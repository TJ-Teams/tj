import { BrowserRouter, Route, Routes } from 'react-router-dom';
import pages from '~/pages';
import PageLayout from './PageLayout';

const Routers = () => (
  <BrowserRouter>
    <PageLayout>
      <Routes>
        {Object.values(pages).map(({ path, Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Routes>
    </PageLayout>
  </BrowserRouter>
);

export default Routers;

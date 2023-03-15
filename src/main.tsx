import { ChakraBaseProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import pages from '~/pages';
import theme from './theme';

const router = createBrowserRouter(pages);

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  </StrictMode>
);

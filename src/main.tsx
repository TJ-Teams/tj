import { ChakraBaseProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './pages/Routers';
import theme from './theme';

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <Routers />
    </ChakraBaseProvider>
  </StrictMode>
);

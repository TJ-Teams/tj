import { ChakraBaseProvider } from '@chakra-ui/react';
import ru from 'date-fns/locale/ru';
import { StrictMode } from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ReactDOM from 'react-dom/client';
import Routers from './pages/Routers';
import theme from './theme';

registerLocale('ru', ru);
setDefaultLocale('ru');

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <Routers />
    </ChakraBaseProvider>
  </StrictMode>
);

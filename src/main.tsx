import 'react-datasheet-grid/dist/style.css';

import { ChakraBaseProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ru from 'date-fns/locale/ru';
import { StrictMode } from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ReactDOM from 'react-dom/client';
import Routers from './pages/Routers';
import theme from './theme';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(customParseFormat);
dayjs.extend(utc);

registerLocale('ru', ru);
setDefaultLocale('ru');

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();

ReactDOM.createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraBaseProvider theme={theme}>
        <Routers />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraBaseProvider>
    </QueryClientProvider>
  </StrictMode>
);

import 'react-datasheet-grid/dist/style.css';

import { ChakraBaseProvider } from '@chakra-ui/react';
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

ReactDOM.createRoot(container).render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <Routers />
    </ChakraBaseProvider>
  </StrictMode>
);

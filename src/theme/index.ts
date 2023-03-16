import { extendBaseTheme, ThemeConfig } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import foundations from './foundations';
import styles from './styles';

const config: ThemeConfig = {
  initialColorMode: 'light',
};

export default extendBaseTheme({
  ...foundations,
  components: chakraTheme.components,
  styles,
  config,
});

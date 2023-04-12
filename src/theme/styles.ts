import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    html: {
      minH: '100vh',
      bg: 'white',
      scrollBehavior: 'smooth',
    },
    ':root': {
      '--dsg-selection-border-color': '#cf92ff',
      '--dsg-border-color': '#e5e5e5',
      '--dsg-selection-border-radius': '0px',
    },
    '.recharts-sector, .recharts-pie': {
      outline: 'none',
    },
  },
};

export default styles;

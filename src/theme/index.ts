import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

const { Button } = chakraTheme.components;

export default extendBaseTheme({
  components: { Button },
});

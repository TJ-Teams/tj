import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  color: 'black',
  lineHeight: '140%',
  fontWeight: 'normal',
  fontSize: 'inherit',
});

export default defineStyleConfig({
  baseStyle,
});

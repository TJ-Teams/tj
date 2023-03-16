import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  w: 'fit-content',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _focusVisible: {
    boxShadow: 'outline',
  },
  _disabled: {
    cursor: 'not-allowed',
  },
});

const variantPrimary = defineStyle({
  color: '#F5F5F5',
  bg: '#0044CB',
  _hover: {
    bg: '#366FE0',
  },
  _active: {
    bg: '#245ED2',
  },
  _disabled: {
    opacity: 0.6,
  },
});

const variants = {
  primary: variantPrimary,
};

const sizes = {
  free: defineStyle({
    p: 0,
    w: 'fit-content',
    h: 'fit-content',
  }),
};

export default defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'free',
  },
});

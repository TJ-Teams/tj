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
  bg: 'primary.3',
  _hover: {
    bg: 'primary.1',
  },
  _active: {
    bg: 'primary.2',
  },
  _disabled: {
    opacity: 0.6,
  },
});

const variantOutline = defineStyle({
  color: 'neutral.6',
  border: '1px solid',
  borderColor: 'neutral.3',
  _hover: {
    bg: 'transparent',
    borderColor: 'primary.3',
    _disabled: {
      borderColor: 'neutral.3',
    },
  },
  _active: {
    bg: 'transparent',
  },
});

const variantClear = defineStyle({
  color: 'black',
  bg: 'transparent',
  _hover: {
    bg: 'transparent',
  },
  _active: {
    bg: 'transparent',
  },
});

const variants = {
  primary: variantPrimary,
  outline: variantOutline,
  clear: variantClear,
};

const sizes = {
  free: defineStyle({
    p: 0,
    w: 'fit-content',
    h: 'fit-content',
  }),
  normal: defineStyle({
    px: '50px',
    py: 4,
    lineHeight: '16px',
    fontSize: '14px',
    fontWeight: 'medium',
    borderRadius: 10,
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

import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    w: 'full',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _readOnly: {
      cursor: 'pointer',
    },
    _disabled: {
      cursor: 'not-allowed',
    },
  },
});

const variantPrimary = definePartsStyle({
  field: {
    color: '#403A4B',
    bg: 'rgba(109, 156, 251, 0.18)',
    border: '2px solid',
    borderColor: 'transparent',
    fontWeight: '400',
    _placeholder: {
      color: 'rgba(64, 58, 75, 0.6)',
    },
    _hover: {
      borderColor: 'rgba(109, 156, 251, 0.25)',
    },
    _focus: {
      zIndex: 1,
      borderColor: 'rgba(109, 156, 251, 0.5)',
    },
  },
});

const variants = {
  primary: variantPrimary,
};

const size = {
  normal: defineStyle({
    h: '58px',
    px: 5,
    fontSize: '18px',
    borderRadius: 8,
  }),
};

const sizes = {
  normal: definePartsStyle({
    field: size.normal,
    addon: size.normal,
  }),
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'normal',
    variant: 'primary',
  },
});

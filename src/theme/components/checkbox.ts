import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import { cssVar } from '@chakra-ui/react';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $size = cssVar('checkbox-size');

const baseStyleControl = defineStyle({
  w: $size.reference,
  h: $size.reference,
  color: 'neutral.1',
  bg: 'neutral.1',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  border: '1px solid',
  borderRadius: 3,
  borderColor: 'neutral.3',
  _hover: {
    borderColor: '#852AD3',
  },
  _checked: {
    bg: '#852AD3',
    borderColor: '#852AD3',
    _hover: {
      bg: '#852AD3',
      opacity: 0.8,
    },
  },
  _focus: {
    boxShadow: 'none',
  },
});

const baseStyleContainer = defineStyle({
  _disabled: { cursor: 'not-allowed' },
});

const baseStyleLabel = defineStyle({
  userSelect: 'none',
  _disabled: { opacity: 0.4 },
});

const baseStyleIcon = defineStyle({
  transitionProperty: 'transform',
  transitionDuration: 'normal',
});

const baseStyle = definePartsStyle({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel,
});

const sizes = {
  normal: definePartsStyle({
    control: { [$size.variable]: '24px' },
    label: { fontSize: 'normal' },
    icon: { fontSize: '0.75rem' },
  }),
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'normal',
  },
});

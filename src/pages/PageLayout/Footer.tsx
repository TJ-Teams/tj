import { Text, TextProps } from '@chakra-ui/react';
import { memo } from 'react';

const Footer = (props: TextProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Text
      {...props}
      fontSize="12px"
      textAlign="center"
      color="blackAlpha.700"
      children={`${currentYear} © Traders's Journal - Все права защищены`}
    />
  );
};

export default memo(Footer);

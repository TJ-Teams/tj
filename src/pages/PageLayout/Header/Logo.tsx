import { Image } from '@chakra-ui/react';
import Link from '~/components/Link';

const Logo = () => (
  <Link
    w="100px"
    href="/"
    borderRadius={8}
    _hover={{ opacity: 0.8 }}
    _active={{ opacity: 0.9 }}
    children={<Image pointerEvents="none" src="/images/logo.svg" alt="logo" />}
  />
);

export default Logo;

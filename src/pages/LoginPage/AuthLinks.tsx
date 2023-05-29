import { HStack } from '@chakra-ui/react';
import Link from '~/components/Link';
import paths from '~/pages/paths';

const AuthLinks = () => (
  <HStack spacing="36px">
    <Link
      fontSize={{ base: '16px', md: '24px' }}
      fontWeight="600"
      textTransform="uppercase"
      borderRadius={4}
      href={paths.login.makePath()}
      children="Вход"
    />
    <Link
      fontSize={{ base: '16px', md: '24px' }}
      fontWeight="600"
      textTransform="uppercase"
      borderRadius={4}
      href={paths.register.makePath()}
      children="Регистрация"
    />
  </HStack>
);

export default AuthLinks;

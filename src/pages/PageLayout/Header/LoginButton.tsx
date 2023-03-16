import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import paths from '~/pages/paths';

const LoginButton = () => (
  <Button
    px={8}
    h="46px"
    as={Link}
    to={paths.login.makePath()}
    fontWeight="800"
    fontSize="18px"
    borderRadius={20}
    children="Войти"
  />
);

export default LoginButton;

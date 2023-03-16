import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginButton = () => (
  <Button
    px={8}
    h="46px"
    as={Link}
    to="/login"
    color="#F5F5F5"
    bg="#0044CB"
    fontWeight="800"
    fontSize="18px"
    borderRadius={20}
    _hover={{ bg: '#366FE0' }}
    _active={{ bg: '#245ED2' }}
    children="Войти"
  />
);

export default LoginButton;

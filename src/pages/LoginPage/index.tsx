import { Button, Center, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '~/api';
import { useLoadingState } from '~/hooks';
import { useAuthContext } from '~/utils/AuthProvide';
import paths from '../paths';
import AuthLinks from './AuthLinks';
import LoginForm, { LoginFormData } from './LoginForm';

const LoginPage = () => {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading, trackLoading } = useLoadingState();

  if (isAuth.get) {
    navigate(paths.main.makePath(), { replace: true });
  }

  const onLogin = async (data: LoginFormData) =>
    trackLoading(async () => {
      await api.user.login(data);
      isAuth.set(true);
      navigate(paths.deals.makePath(), { replace: true });
    });

  return (
    <Center flex={1}>
      <Flex
        m={8}
        px={{ base: '36px', md: '72px' }}
        py={{ base: '32px', md: '62px' }}
        w="540px"
        flexDir="column"
        borderRadius={30}
        boxShadow="0px 4px 17px rgba(0, 0, 0, 0.17)"
      >
        <AuthLinks />
        <LoginForm
          mt={{ base: '22px', md: '44px' }}
          mb={{ base: '25px', md: '50px' }}
          onSubmit={onLogin}
        />
        <Button
          w="full"
          p={4}
          type="submit"
          form="login-form"
          textTransform="uppercase"
          borderRadius={8}
          children="Войти"
          isLoading={isLoading}
        />
        {/* TODO some day :) */}
        {/* <Divider mt="28px" mb="10px" borderColor="#4F5D7C" /> */}
        {/* <ResetPasswordLink /> */}
      </Flex>
    </Center>
  );
};

export default LoginPage;

import { Button, Center, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '~/api';
import { useLoadingState } from '~/hooks';
import { useAuthContext } from '~/utils/AuthProvide';
import AuthLinks from '../LoginPage/AuthLinks';
import paths from '../paths';
import RegisterForm, { RegisterFormData } from './RegisterForm';

const RegisterPage = () => {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading, trackLoading } = useLoadingState();

  if (isAuth.get) {
    navigate(paths.main.makePath(), { replace: true });
  }

  const onRegister = async (data: RegisterFormData) =>
    trackLoading(async () => {
      await api.user.register({
        first_name: data.firstName,
        second_name: data.lastName,
        email: data.email,
        password: data.password,
      });
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
        <RegisterForm
          mt={{ base: '22px', md: '44px' }}
          mb={{ base: '25px', md: '50px' }}
          onSubmit={onRegister}
        />
        <Button
          w="full"
          p={4}
          type="submit"
          form="register-form"
          textTransform="uppercase"
          borderRadius={8}
          children="Зарегистрироваться"
          isLoading={isLoading}
        />
      </Flex>
    </Center>
  );
};

export default RegisterPage;

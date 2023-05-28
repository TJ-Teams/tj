import { Button, Center, Flex } from '@chakra-ui/react';
import AuthLinks from './AuthLinks';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <Center flex={1}>
    <Flex
      px="72px"
      py="62px"
      mt={4}
      w="540px"
      flexDir="column"
      borderRadius={30}
      boxShadow="0px 4px 17px rgba(0, 0, 0, 0.17)"
    >
      <AuthLinks />
      <LoginForm mt="44px" mb="50px" />
      <Button
        w="full"
        p={4}
        type="submit"
        form="login-form"
        textTransform="uppercase"
        borderRadius={8}
        children="Войти"
      />
      {/* TODO some day :) */}
      {/* <Divider mt="28px" mb="10px" borderColor="#4F5D7C" /> */}
      {/* <ResetPasswordLink /> */}
    </Flex>
  </Center>
);

export default LoginPage;

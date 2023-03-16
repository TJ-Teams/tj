import { Button, Center, Flex } from '@chakra-ui/react';
import AuthLinks from '../LoginPage/AuthLinks';
import RegisterForm from './RegisterForm';

const RegisterPage = () => (
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
      <RegisterForm mt="44px" mb="50px" />
      <Button
        w="full"
        p={4}
        textTransform="uppercase"
        borderRadius={8}
        children="Зарегистрироваться"
      />
    </Flex>
  </Center>
);

export default RegisterPage;

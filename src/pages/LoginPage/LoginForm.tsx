import { Stack, StackProps } from '@chakra-ui/react';
import Input from '~/components/Input';

const LoginForm = (props: StackProps) => (
  <Stack as="form" spacing={3} {...props}>
    <Input type="email" label="E-mail" autoComplete="on" />
    <Input type="password" label="Пароль" autoComplete="on" />
  </Stack>
);

export default LoginForm;

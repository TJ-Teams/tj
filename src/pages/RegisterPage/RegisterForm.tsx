import { Stack, StackProps } from '@chakra-ui/react';
import Input from '~/components/Input';

const RegisterForm = (props: StackProps) => (
  <Stack as="form" spacing={3} {...props}>
    <Input label="Имя" autoComplete="on" />
    <Input label="Фамилия" autoComplete="on" />
    <Input type="email" label="E-mail" autoComplete="on" />
    <Input type="password" label="Пароль" autoComplete="on" />
    <Input type="password" label="Повторите пароль" autoComplete="on" />
  </Stack>
);

export default RegisterForm;

import { StackProps } from '@chakra-ui/react';
import * as yup from 'yup';
import Form from '~/components/Form';

type Props = {
  onSubmit?: (data: LoginFormData) => Promise<void>;
} & Omit<StackProps, 'onSubmit'>;

const LoginForm = ({ onSubmit, ...props }: Props) => (
  <Form.Layout
    id="login-form"
    schema={loginFormSchema}
    onSubmit={onSubmit}
    spacing={3}
    {...props}
  >
    <Form.Input
      isRequired
      isInitialFocus
      label="E-mail"
      autoComplete="on"
      field="email"
    />
    <Form.Input
      isRequired
      isPassword
      label="Пароль"
      autoComplete="on"
      field="password"
    />
  </Form.Layout>
);

const requiredLabel = 'Обязательное поле';

const loginFormSchema = yup.object({
  email: yup.string().required(requiredLabel).email('Некорректный e-mail'),
  password: yup.string().required(requiredLabel),
});

export type LoginFormData = yup.InferType<typeof loginFormSchema>;

export default LoginForm;

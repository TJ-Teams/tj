import { StackProps } from '@chakra-ui/react';
import * as yup from 'yup';
import Form from '~/components/Form';

type Props = {
  onSubmit?: (data: RegisterFormData) => void;
} & Omit<StackProps, 'onSubmit'>;

const RegisterForm = ({ onSubmit, ...props }: Props) => (
  <Form.Layout
    id="register-form"
    schema={registerFormSchema}
    onSubmit={onSubmit}
    spacing={3}
    {...props}
  >
    {inputData.map((d, i) => (
      <Form.Input
        isRequired
        key={d.field}
        field={d.field}
        label={d.label}
        autoComplete="on"
        isInitialFocus={i === 0}
        isPassword={d.isPassword}
      />
    ))}
  </Form.Layout>
);

const inputData: Array<{
  field: keyof RegisterFormData;
  label: string;
  isPassword?: boolean;
}> = [
  { field: 'firstName', label: 'Имя' },
  { field: 'lastName', label: 'Фамилия' },
  { field: 'email', label: 'E-mail' },
  { field: 'password', label: 'Пароль', isPassword: true },
  { field: 'repeatPassword', label: 'Повторите пароль', isPassword: true },
];

const requiredLabel = 'Обязательное поле';

const registerFormSchema = yup.object({
  firstName: yup.string().required(requiredLabel),
  lastName: yup.string().required(requiredLabel),
  email: yup.string().required(requiredLabel).email('Некорректный e-mail'),
  password: yup
    .string()
    .required(requiredLabel)
    .min(8, 'Минимальная длина пароль 8 символов'),
  repeatPassword: yup
    .string()
    .required(requiredLabel)
    .oneOf([yup.ref('password')], 'Пароли не одинаковые'),
});

export type RegisterFormData = yup.InferType<typeof registerFormSchema>;

export default RegisterForm;

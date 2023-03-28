import * as yup from 'yup';
import Form from '~/components/Form';
import { Parameter, TypeParameter } from '../types';

export const createParameterFormSchema = (existingParameters: Parameter[]) =>
  yup
    .object({
      key: yup
        .string()
        .trim()
        .required(Form.labels.required)
        .max(40, Form.labels.maxLength(40))
        .notOneOf(
          existingParameters.map((p) => p.key),
          'Параметр с таким ключом уже существует'
        )
        .matches(/^[a-zA-Z\-]+$/, 'Допустимы только буквы a-Z и символ тире'),
      name: yup
        .string()
        .trim()
        .required(Form.labels.required)
        .max(40, Form.labels.maxLength(40)),
      type: yup.mixed<TypeParameter>().required(Form.labels.required),
    })
    .required();

export type ParameterFormData = yup.Asserts<
  ReturnType<typeof createParameterFormSchema>
>;

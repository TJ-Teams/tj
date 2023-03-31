import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';
import Form from '~/components/Form';
import { Parameter, TypeParameter } from '~/types/deals';

type TypeParameterSchema = RequiredStringSchema<
  TypeParameter | undefined,
  AnyObject
>;

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
      type: yup
        .string()
        .oneOf(['string', 'number', 'date'])
        .required(Form.labels.required) as TypeParameterSchema,
    })
    .required();

export type ParameterFormData = yup.Asserts<
  ReturnType<typeof createParameterFormSchema>
>;

import * as yup from 'yup';

const validateField = (
  schema: yup.AnyObjectSchema,
  field: string,
  data: Record<string, unknown>
) => {
  try {
    schema.validateSyncAt(field, data);
    return undefined;
  } catch (error) {
    return (error as yup.ValidationError)?.message;
  }
};

export default validateField;

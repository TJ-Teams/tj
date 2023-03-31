import * as yup from "yup";

const validateField = (
  schema: yup.AnyObjectSchema,
  field: string,
  value: unknown
) => {
  try {
    schema.validateSyncAt(field, { [field]: value });
    return undefined;
  } catch (error) {
    return (error as yup.ValidationError)?.message;
  }
};

export default validateField;

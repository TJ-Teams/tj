import { memo, useState } from 'react';
import Input from '~/components/Input';
import { useFieldFocus } from '~/hooks';
import { InputProps } from '../Input';
import PasswordInput from '../PasswordInput';
import { useFormContext } from './FormLayout';
import validateField from './validate-field';

type Props = {
  field: string;
  label?: string;
  isRequired?: boolean;
  isInitialFocus?: boolean;
  isPassword?: boolean;
} & InputProps;

const FormInput = ({
  label,
  field,
  isRequired,
  isInitialFocus,
  isPassword,
  ...props
}: Props) => {
  const { schema, data, dataErrors, onDataChange } =
    useFormContext<Record<string, string>>();

  const hasError = Boolean(dataErrors.focusField);

  const ref = useFieldFocus<HTMLInputElement>({
    isActive: dataErrors.focusField === field,
    needFocusAtFirstMount: isInitialFocus,
    deps: [dataErrors],
  });

  const [value, setValue] = useState(data.get?.[field] || '');

  const handleValueChange = (newValue: string) => {
    onDataChange({ [field]: newValue });
    setValue(newValue);
  };

  const Component = isPassword ? PasswordInput : Input;

  return (
    <Component
      {...props}
      ref={ref}
      label={label}
      value={value}
      onValueChange={handleValueChange}
      errorMessage={hasError ? validateField(schema, field, data.get) : ''}
      formControlProps={{ isRequired, ...props.formControlProps }}
    />
  );
};

export default memo(FormInput);

import { BoxProps, useForceUpdate } from '@chakra-ui/react';
import { memo } from 'react';
import Select from '~/components/Select';
import { useFieldFocus } from '~/hooks';
import { InputProps } from '../Input';
import { SelectOption } from '../Select/types';
import { useFormContext } from './FormLayout';
import validateField from './validate-field';

type Props = {
  field: string;
  label?: string;
  isRequired?: boolean;
  isInitialFocus?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  options: SelectOption[];
  allowInput?: boolean;
  boxProps?: Omit<BoxProps, 'onChange'>;
} & InputProps;

const FormSingleSelect = ({
  label,
  field,
  isRequired,
  isInitialFocus,
  isDisabled,
  isLoading,
  options,
  allowInput,
  boxProps,
  ...props
}: Props) => {
  const forceUpdate = useForceUpdate();
  const { schema, data, dataErrors, onDataChange } =
    useFormContext<Record<string, string>>();

  const hasError = Boolean(dataErrors.focusField);

  const ref = useFieldFocus<HTMLInputElement>({
    isActive: Boolean(isRequired && dataErrors.focusField === field),
    needFocusAtFirstMount: isInitialFocus,
    deps: [dataErrors],
  });

  const errorMessage =
    !isDisabled && hasError ? validateField(schema, field, data.get) : '';

  const handleChange = (option?: SelectOption) => {
    onDataChange({ [field]: option?.key || '' });
    forceUpdate();
  };

  return (
    <Select.Single
      ref={ref}
      options={options}
      label={label}
      onChange={handleChange}
      allowInput={allowInput}
      isLoading={isLoading}
      defaultOptionKey={data.get[field]}
      inputProps={{
        errorMessage,
        isDisabled,
        formControlProps: { isRequired },
        ...props,
      }}
      {...boxProps}
    />
  );
};

export default memo(FormSingleSelect);

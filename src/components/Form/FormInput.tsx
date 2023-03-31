import { memo, useEffect, useState } from "react";
import Input from "~/components/Input";
import { useFieldFocus } from "~/hooks";
import { InputProps } from "../Input";
import { useFormContext } from "./FormLayout";
import validateField from "./validate-field";

type Props = {
  field: string;
  label?: string;
  isRequired?: boolean;
  isInitialFocus?: boolean;
} & InputProps;

const FormInput = ({
  label,
  field,
  isRequired,
  isInitialFocus,
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

  const [value, setValue] = useState(data.get?.[field] || "");

  useEffect(() => {
    onDataChange({ [field]: value });
  }, [value]);

  return (
    <Input
      {...props}
      ref={ref}
      label={label}
      value={value}
      onValueChange={setValue}
      errorMessage={hasError ? validateField(schema, field, value) : ""}
      formControlProps={{ isRequired, ...props.formControlProps }}
    />
  );
};

export default memo(FormInput);

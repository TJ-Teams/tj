import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import FormControl, { FormControlProps } from './FormControl';

export type InputProps = {
  label: string;
  onValueChange?: (value: string) => void;
  formControlProps?: FormControlProps;
  errorMessage?: string;
  hasExternalValue?: boolean;
} & ChakraInputProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      onValueChange,
      onChange,
      formControlProps,
      errorMessage,
      hasExternalValue,
      ...props
    },
    ref
  ) => {
    const [hasValue, setHasValue] = useState(
      Boolean(props.defaultValue || props.value)
    );

    useEffect(() => {
      setHasValue(Boolean(props.value));
    }, [props.value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setHasValue(value.length > 0);
      onValueChange?.(value);
      onChange?.(event);
    };

    return (
      <FormControl
        label={label}
        errorMessage={errorMessage}
        formLabelProps={{
          position: 'absolute',
          left: 6,
          top: hasExternalValue || hasValue ? 2 : 5,
          fontSize: hasExternalValue || hasValue ? '14px' : '18px',
          transitionProperty: 'top,font-size',
          transitionDuration: 'fast',
        }}
        _focusWithin={{ '.form-label': { top: 2, fontSize: '14px' } }}
        {...formControlProps}
      >
        <ChakraInput
          pt={4}
          ref={ref}
          autoComplete="off"
          required={false}
          onChange={handleChange}
          {...props}
        />
      </FormControl>
    );
  }
);

export default Input;

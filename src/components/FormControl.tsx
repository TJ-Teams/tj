import {
  Collapse,
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

export type FormControlProps = {
  label?: string;
  errorMessage?: string;
  formLabelProps?: FormLabelProps;
} & ChakraFormControlProps;

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ label, errorMessage, children, formLabelProps, ...props }, ref) => (
    <ChakraFormControl ref={ref} isInvalid={Boolean(errorMessage)} {...props}>
      {label && (
        <FormLabel
          zIndex={2}
          className="form-label"
          mb={1}
          noOfLines={1}
          color="rgba(64, 58, 75, 0.6)"
          lineHeight="17px"
          fontWeight="400"
          fontSize="14px"
          pointerEvents="none"
          children={label}
          {...formLabelProps}
        />
      )}
      {children}
      <Collapse in={Boolean(errorMessage)} animateOpacity unmountOnExit>
        <FormHelperText
          mt={2}
          color="#EF302B"
          lineHeight="140%"
          fontWeight="normal"
          fontSize="12px"
          children={errorMessage}
        />
      </Collapse>
    </ChakraFormControl>
  )
);

export default FormControl;

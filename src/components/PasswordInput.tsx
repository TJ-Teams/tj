import { Icon, IconButton, useBoolean } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Input, { InputProps } from './Input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isShowPassword, setIsShowPassword] = useBoolean(false);

  return (
    <Input
      {...props}
      ref={ref}
      type={isShowPassword ? 'text' : 'password'}
      rightElement={
        <IconButton
          aria-label="t"
          size="free"
          variant="empty"
          color="primary.3"
          borderRadius={8}
          opacity={0.5}
          _hover={{ opacity: 0.75 }}
          onClick={setIsShowPassword.toggle}
          icon={
            <Icon
              boxSize={6}
              as={isShowPassword ? AiFillEye : AiFillEyeInvisible}
            />
          }
        />
      }
    />
  );
});

export default PasswordInput;

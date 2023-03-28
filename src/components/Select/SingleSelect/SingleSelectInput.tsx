import { IconButton, Spinner, useMergeRefs } from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import Input, { InputProps } from '~/components/Input';
import { CrossIcon, MiniArrowUpIcon } from '~/icons';

type Props = {
  allowInput?: boolean;
  isDropdownOpen?: boolean;
  isLoading?: boolean;
  isShowClear?: boolean;
  onClear?: () => void;
} & InputProps;

const SelectInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      allowInput,
      isDropdownOpen,
      isLoading,
      isShowClear,
      onClear,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const refs = useMergeRefs(inputRef, ref);

    return (
      <Input
        {...inputProps}
        ref={refs}
        cursor={allowInput ? 'text' : 'pointer'}
        rightElementProps={{ pointerEvents: isShowClear ? undefined : 'none' }}
        rightElement={
          isLoading ? (
            <Spinner boxSize={4} color="rgba(109, 156, 251, 0.9)" />
          ) : isShowClear ? (
            <IconButton
              size="free"
              variant="empty"
              boxSize={4}
              color="rgba(109, 156, 251, 0.9)"
              _hover={{ color: 'rgba(109, 156, 251, 0.6)' }}
              icon={<CrossIcon boxSize={3} />}
              onClick={onClear}
              aria-label="Очистить"
            />
          ) : (
            <MiniArrowUpIcon
              boxSize={3}
              color="rgba(109, 156, 251, 0.9)"
              transition="ease-in-out 0.3s"
              transform={`rotate(${isDropdownOpen ? 0 : 180}deg)`}
            />
          )
        }
      />
    );
  }
);

export default SelectInput;

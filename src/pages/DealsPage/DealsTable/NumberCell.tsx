import {
  Center,
  FlexProps,
  NumberInput,
  NumberInputField,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useFieldFocus, useOutsideAction } from '~/hooks';
import { CellProps } from './Cell';

type Props = FlexProps & Pick<CellProps, 'getValue' | 'onUpdate'>;

const NumberCell = ({ getValue, onUpdate, ...props }: Props) => {
  const [isEditor, setIsEditor] = useBoolean(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useFieldFocus<HTMLInputElement>({
    isActive: isEditor,
    withSelect: true,
    deps: [isEditor],
  });

  const handleEdit = () => {
    setIsEditor.on();
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const handleSave = () => {
    const value = inputRef.current?.value;
    onUpdate?.(value);
    setIsEditor.off();
  };

  useOutsideAction({
    boxRef,
    isActive: isEditor,
    callBackOnExit: handleSave,
    triggerKeys: ['Enter'],
  });

  const numberValue = parseFloat((getValue() || '').toString());
  const normalizedValue = !isNaN(numberValue)
    ? numberValue.toLocaleString()
    : '—';

  return (
    <Center
      ref={boxRef}
      cursor={isEditor ? 'text' : 'pointer'}
      onClick={handleEdit}
      justifyContent="flex-end"
      {...props}
    >
      {isEditor && boxRef.current ? (
        <NumberInput
          variant="unstyled"
          defaultValue={
            !isNaN(numberValue) ? numberValue.toLocaleString() : undefined
          }
        >
          <NumberInputField
            ref={inputRef}
            p={0}
            h="fit-content"
            w={boxRef.current.getBoundingClientRect().width - 32}
            bg="transparent"
            fontSize="inherit"
            textAlign="right"
            borderRadius={0}
          />
        </NumberInput>
      ) : (
        <Text noOfLines={1} children={normalizedValue} />
      )}
    </Center>
  );
};

export default NumberCell;

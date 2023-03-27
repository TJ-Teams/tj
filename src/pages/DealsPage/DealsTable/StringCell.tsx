import { Center, FlexProps, Input, Text, useBoolean } from '@chakra-ui/react';
import { useRef } from 'react';
import { useFieldFocus, useOutsideAction } from '~/hooks';
import { CellProps } from './Cell';

type Props = FlexProps & Pick<CellProps, 'getValue' | 'onUpdate'>;

const StringCell = ({ getValue, onUpdate, ...props }: Props) => {
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

  const value = getValue()?.toString();

  return (
    <Center
      ref={boxRef}
      cursor={isEditor ? 'text' : 'pointer'}
      onClick={handleEdit}
      {...props}
    >
      {isEditor && boxRef.current ? (
        <Input
          ref={inputRef}
          p={0}
          h="fit-content"
          w={boxRef.current.getBoundingClientRect().width - 32}
          variant="unstyled"
          bg="transparent"
          fontSize="inherit"
          textAlign="center"
          borderRadius={0}
          defaultValue={value || ''}
        />
      ) : (
        <Text noOfLines={2} children={value || '—'} />
      )}
    </Center>
  );
};

export default StringCell;

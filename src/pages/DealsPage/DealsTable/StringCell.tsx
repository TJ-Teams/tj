import { Center, FlexProps, Input, Text, useBoolean } from '@chakra-ui/react';
import { useRef } from 'react';
import { useFieldFocus, useOutsideAction } from '~/hooks';
import { useDealsContext } from '../deals-context';
import { CellProps } from './Cell';

type Props = FlexProps & Pick<CellProps, 'cellKey' | 'getValue' | 'onUpdate'>;

const StringCell = ({ cellKey, getValue, onUpdate, ...props }: Props) => {
  const { subscriptions } = useDealsContext();

  const [isEditor, setIsEditor] = useBoolean(false);

  subscriptions.useSubscribe(`${cellKey}:focus`, setIsEditor.on);

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
      onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
      {...props}
    >
      {isEditor && boxRef.current ? (
        <Input
          ref={inputRef}
          p={0}
          h="fit-content"
          w={boxRef.current.getBoundingClientRect().width - 33}
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

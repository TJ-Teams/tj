import { HStack, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import PlusIcon from '../PlusIcon';

type Props = {
  onAdd?: () => void;
};

const AddDealButton = ({ onAdd }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <HStack
      px={2}
      py={4}
      spacing={2}
      cursor="pointer"
      _hover={{ color: 'gray' }}
      onClick={() => ref.current?.click()}
    >
      <IconButton
        ref={ref}
        boxSize={4}
        borderRadius={2}
        variant="clear"
        aria-label="добавить сделку"
        icon={<PlusIcon />}
        onClick={onAdd}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Добавить сделку"
      />
    </HStack>
  );
};

export default AddDealButton;

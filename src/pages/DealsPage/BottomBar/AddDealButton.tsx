import { HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

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
        color="#852AD3"
        aria-label="добавить сделку"
        icon={<Icon as={FaPlus} />}
        onClick={onAdd}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Добавить сделку"
        display={{ base: 'none', lg: 'initial' }}
      />
    </HStack>
  );
};

export default AddDealButton;

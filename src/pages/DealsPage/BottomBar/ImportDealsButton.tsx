import { HStack, IconButton, Text, useBoolean } from '@chakra-ui/react';
import PlusIcon from '../PlusIcon';
import ImportDealsWindow from './ImportDealsWindow';

const ImportDealsButton = () => {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <HStack
      px={2}
      py={4}
      spacing={2}
      cursor="pointer"
      _hover={{ color: 'gray' }}
      onClick={setIsOpen.on}
    >
      <IconButton
        boxSize={4}
        borderRadius={2}
        variant="clear"
        aria-label="импортировать журнал сделок"
        onClick={setIsOpen.on}
        icon={<PlusIcon />}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Импортировать журнал сделок"
      />
      <ImportDealsWindow isOpen={isOpen} onClose={setIsOpen.off} />
    </HStack>
  );
};

export default ImportDealsButton;

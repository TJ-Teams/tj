import { HStack, Icon, IconButton, Text, useBoolean } from '@chakra-ui/react';
import { BiImport } from 'react-icons/bi';
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
        color="#852AD3"
        aria-label="импортировать журнал сделок"
        onClick={setIsOpen.on}
        icon={<Icon boxSize={5} as={BiImport} />}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Импортировать"
        display={{ base: 'none', lg: 'initial' }}
      />
      <ImportDealsWindow isOpen={isOpen} onClose={setIsOpen.off} />
    </HStack>
  );
};

export default ImportDealsButton;

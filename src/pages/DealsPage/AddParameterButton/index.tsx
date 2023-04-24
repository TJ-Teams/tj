import { Flex, Icon, IconButton, Text, useBoolean } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import AddParameterWindow from './AddParameterWindow';

const AddParameterButton = () => {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <Flex
      pt={4}
      pb={6}
      cursor="pointer"
      _hover={{ color: 'gray' }}
      flexDir="column"
      align="center"
      onClick={setIsOpen.on}
    >
      <IconButton
        mx={4}
        my={2}
        boxSize={4}
        borderRadius={2}
        variant="clear"
        color="#852AD3"
        aria-label="добавить сделку"
        icon={<Icon as={FaPlus} />}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        css={{ writingMode: 'vertical-rl' }}
        children="Добавить параметр"
      />
      <AddParameterWindow isOpen={isOpen} onClose={setIsOpen.off} />
    </Flex>
  );
};

export default AddParameterButton;

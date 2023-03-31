import { Flex, IconButton, Text, useBoolean } from '@chakra-ui/react';
import Window from '~/components/Window';
import PlusIcon from '../PlusIcon';
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
      borderRight="1px solid #b9b9b9"
      borderBottom="1px solid #b9b9b9"
      onClick={setIsOpen.on}
    >
      <IconButton
        mx={4}
        my={2}
        boxSize={4}
        borderRadius={2}
        variant="clear"
        aria-label="добавить сделку"
        icon={<PlusIcon />}
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

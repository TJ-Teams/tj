import { Flex, IconButton, Text } from '@chakra-ui/react';
import PlusIcon from './PlusIcon';

const AddParameterButton = () => (
  <Flex
    pt={4}
    pb={6}
    cursor="pointer"
    _hover={{ color: 'gray' }}
    flexDir="column"
    align="center"
    borderRight="1px solid #b9b9b9"
    borderBottom="1px solid #b9b9b9"
  >
    <IconButton
      mx={4}
      my={2}
      boxSize={4}
      borderRadius="full"
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
  </Flex>
);

export default AddParameterButton;

import { Flex, IconButton, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useDealsContext } from './deals-context';
import PlusIcon from './PlusIcon';

const AddDealButton = () => {
  const { deals, subscriptions } = useDealsContext();

  const handleAdd = () => {
    deals.set([...deals.get, {}]);
    subscriptions.ping('table');
  };

  return (
    <Flex
      px={4}
      mr="49px"
      cursor="pointer"
      _hover={{ color: 'gray' }}
      align="center"
      border="1px solid #b9b9b9"
      borderTop="none"
      onClick={handleAdd}
    >
      <IconButton
        mx={2}
        my={4}
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
        children="Добавить сделку"
      />
    </Flex>
  );
};

export default memo(AddDealButton);

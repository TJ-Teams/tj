import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useDealsContext } from './deals-context';
import PlusIcon from './PlusIcon';
import { v4 as uuidV4 } from 'uuid';
import SaveIndicator from './SaveIndicator';

const AddDealButton = () => {
  const { parameters, deals, subscriptions } = useDealsContext();

  const handleAdd = () => {
    const needToCreate =
      deals.get.at(-1) === undefined ||
      Object.values(deals.get.at(-1) || {}).filter(Boolean).length > 1;

    const id = needToCreate ? uuidV4() : deals.get.at(-1)?.id || '';

    if (needToCreate) {
      deals.set([...deals.get, { id }]);
      subscriptions.ping('table');
    }

    const firstParameter = parameters.get.at(0)?.key;

    if (firstParameter) {
      subscriptions.ping(`id=${id};p=${firstParameter}:focus`, 50);
    }
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
        borderRadius={2}
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
      <Spacer />
      <SaveIndicator />
    </Flex>
  );
};

export default memo(AddDealButton);

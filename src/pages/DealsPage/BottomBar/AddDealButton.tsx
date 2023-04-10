import { HStack, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useDealsContext } from '../deals-context';
import PlusIcon from '../PlusIcon';

const AddDealButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
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
        onClick={handleAdd}
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

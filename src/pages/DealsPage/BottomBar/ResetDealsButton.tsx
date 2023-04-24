import { HStack, Icon, IconButton, Text, useBoolean } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import api from '~/api';
import Alert from '~/components/Alert';
import { useLoadingState } from '~/hooks';
import { useDealsContext } from '../deals-context';

const ResetDealsButton = () => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const { subscriptions, refetch } = useDealsContext();
  const { isLoading, trackLoading } = useLoadingState(false);

  const handleSubmit = () =>
    trackLoading(async () => {
      await api.deals.resetDeals();
      await refetch();
      subscriptions.ping('table');
      setIsOpen.off();
    });

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
        aria-label="Очистить журнал сделок"
        onClick={setIsOpen.on}
        icon={<Icon as={FaTrashAlt} />}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Очистить"
      />
      <Alert
        heading="Очистить журнал сделок"
        children={
          'Вы уверены, что хотите очистить журнал сделок?\n' +
          'Все данные будут утеряны безвозвратно'
        }
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={setIsOpen.off}
        onSubmit={handleSubmit}
      />
    </HStack>
  );
};

export default ResetDealsButton;

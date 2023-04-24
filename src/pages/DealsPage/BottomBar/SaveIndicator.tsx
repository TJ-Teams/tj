import { HStack, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ErrorIcon, SuccessIcon, WarningIcon } from '~/icons';
import { useDealsContext } from '../deals-context';

export type IndicatorStatus = 'saved' | 'not-saved' | 'loading' | 'error';

const SaveIndicator = () => {
  const { subscriptions } = useDealsContext();
  const [status, setStatus] = useState<IndicatorStatus>('saved');

  statuses.map((status) =>
    subscriptions.useSubscribe(`indicator:${status}`, () => setStatus(status))
  );

  const data = getStatusData(status);

  return (
    <HStack color={data.color}>
      <data.Icon boxSize={5} />
      <Text
        color="inherit"
        fontWeight={500}
        noOfLines={1}
        children={data.message}
      />
    </HStack>
  );
};

const statuses: readonly IndicatorStatus[] = [
  'saved',
  'not-saved',
  'loading',
  'error',
];

const getStatusData = (status: IndicatorStatus) => {
  switch (status) {
    case 'saved':
      return {
        Icon: SuccessIcon,
        message: 'Сохранено',
        color: 'green.500',
      };
    case 'not-saved':
      return {
        Icon: WarningIcon,
        message: 'Не сохранено',
        color: 'orange.300',
      };
    case 'loading':
      return {
        Icon: Spinner,
        message: 'Сохраняю',
        color: 'blue.400',
      };
    default:
      return {
        Icon: ErrorIcon,
        message: 'Ошибка',
        color: 'red.500',
      };
  }
};

export default SaveIndicator;

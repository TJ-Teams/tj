import { HStack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import BaseDateInput, { DateInputProps } from '~/components/DateInput';
import { useForceUpdate, useValue } from '~/hooks';

type Props = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  onChange?: (startDate?: Date, endDate?: Date) => void;
};

const SelectDataRange = ({
  defaultStartDate,
  defaultEndDate,
  onChange,
}: Props) => {
  const forceUpdate = useForceUpdate();

  const startDate = useValue(defaultStartDate, {
    onUpdate: (date) => {
      onChange?.(date, endDate.get);
      forceUpdate();
    },
  });
  const endDate = useValue(defaultEndDate, {
    onUpdate: (date) => {
      onChange?.(startDate.get, date);
    },
  });

  return (
    <HStack>
      <Text children="Период от" />
      <DateInput defaultDate={defaultStartDate} onSave={startDate.set} />
      <Text children="до" />
      <DateInput
        defaultDate={defaultEndDate}
        minDate={startDate.get}
        onSave={endDate.set}
      />
    </HStack>
  );
};

const DateInput = (props: DateInputProps) => (
  <BaseDateInput
    w="115px"
    border="1px solid #E0E0E0"
    borderRadius={6}
    {...props}
  />
);

export default memo(SelectDataRange, () => true);

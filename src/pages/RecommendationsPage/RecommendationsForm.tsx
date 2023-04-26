import {
  Button as BaseButton,
  ButtonProps,
  HStack,
  Spacer,
  StackProps,
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import SelectDataRange from '~/components/SelectDataRange';
import { useLoadingState, useValue } from '~/hooks';

type Props = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  onSubmit?: (startDate: Date, endDate: Date) => Promise<void>;
} & Omit<StackProps, 'onSubmit'>;

const RecommendationsForm = ({
  defaultStartDate,
  defaultEndDate,
  onSubmit,
  ...props
}: Props) => {
  const [isValid, setIsValid] = useState(
    Boolean(defaultStartDate && defaultEndDate)
  );
  const { isLoading, trackLoading } = useLoadingState(false);
  const startDate = useValue<Date | undefined>(undefined);
  const endDate = useValue<Date | undefined>(undefined);

  const handleDateRangeChange = (start?: Date, end?: Date) => {
    startDate.set(start);
    endDate.set(end);
    setIsValid(Boolean(start && end));
  };

  const handleSubmit = trackLoading(async () => {
    if (!startDate.get || !endDate.get) return;

    await onSubmit?.(startDate.get, endDate.get);
  });

  return (
    <HStack {...props}>
      <SelectDataRange
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        onChange={handleDateRangeChange}
      />
      <Spacer />
      <Button
        isDisabled={!isValid}
        isLoading={isLoading}
        onClick={handleSubmit}
        children="Получить рекомендации"
      />
    </HStack>
  );
};

const Button = (props: ButtonProps) => (
  <BaseButton
    px={5}
    py={2}
    color="white"
    bg="#852AD3"
    fontSize="16px"
    fontWeight="bold"
    borderRadius={8}
    _hover={{ opacity: 0.8 }}
    _active={{ opacity: 0.9 }}
    {...props}
  />
);

export default memo(RecommendationsForm, () => true);

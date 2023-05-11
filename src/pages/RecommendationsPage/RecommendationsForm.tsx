import {
  Button as BaseButton,
  ButtonProps,
  Flex,
  FlexProps,
  HStack,
  Spacer,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import SelectDataRange from '~/components/SelectDataRange';
import { useLoadingState, useMethodAfterMount, useValue } from '~/hooks';
import { Parameter } from '~/types/deals';

type Props = {
  isLoading?: boolean;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  defaultParameterKeys?: string[];
  onSubmit?: (
    startDate: Date,
    endDate: Date,
    parameterKeys: string[]
  ) => Promise<void>;
} & Omit<FlexProps, 'onSubmit'>;

const RecommendationsForm = ({
  isLoading,
  defaultStartDate,
  defaultEndDate,
  defaultParameterKeys,
  onSubmit,
  ...props
}: Props) => {
  const parameters = useValue<Parameter[]>([]);
  const [parameterKeys, setParameterKeys] = useState(
    () => new Set(defaultParameterKeys)
  );
  const [isValidDateRange, setIsValidDateRange] = useState(
    Boolean(defaultStartDate && defaultEndDate)
  );
  const startDate = useValue(defaultStartDate);
  const endDate = useValue(defaultEndDate);

  const { isLoading: isParamsLoading, setIsLoading: setIsParamsLoading } =
    useLoadingState(true);

  useMethodAfterMount(() => api.deals.getParameters(), {
    onStartLoading: setIsParamsLoading.on,
    onEndLoading: setIsParamsLoading.off,
    next: (params) => {
      setParameterKeys(
        new Set(
          [...parameterKeys].filter((key) => params.find((p) => p.key === key))
        )
      );
      parameters.set(params);
    },
  });

  if (isParamsLoading) {
    return isLoading ? null : <PageLoader />;
  }

  const handleDateRangeChange = (start?: Date, end?: Date) => {
    startDate.set(start);
    endDate.set(end);
    setIsValidDateRange(Boolean(start && end));
  };

  const handleChooseParameter = (parameterKey: string) => () => {
    const newParameterKeys = new Set(parameterKeys);
    if (parameterKeys.has(parameterKey)) {
      newParameterKeys.delete(parameterKey);
    } else {
      newParameterKeys.add(parameterKey);
    }
    setParameterKeys(newParameterKeys);
  };

  const handleSubmit = async () => {
    if (!startDate.get || !endDate.get || parameterKeys.size === 0) return;
    await onSubmit?.(startDate.get, endDate.get, [...parameterKeys]);
  };

  return (
    <Flex flexDir="column" {...props}>
      <Text fontWeight="bold" children="Параметры для анализа" />
      <Wrap mt={2} mb={6}>
        {parameters.get
          .filter((p) => p.type === 'string')
          .map((p) => (
            <CheckboxButton
              key={p.key}
              isActive={parameterKeys.has(p.key)}
              isDisabled={parameterKeys.size > 6}
              children={p.name}
              onClick={handleChooseParameter(p.key)}
            />
          ))}
      </Wrap>
      <HStack>
        <SelectDataRange
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          onChange={handleDateRangeChange}
        />
        <Spacer />
        <Button
          isDisabled={
            !isValidDateRange || parameterKeys.size === 0 || isLoading
          }
          onClick={handleSubmit}
          children="Получить рекомендации"
        />
      </HStack>
    </Flex>
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

const CheckboxButton = ({ isActive, isDisabled, ...props }: ButtonProps) => (
  <BaseButton
    px={2}
    py={1}
    borderRadius={4}
    isDisabled={isDisabled && !isActive}
    bg={isActive ? '#852AD3' : 'transparent'}
    color={isActive ? 'neutral.1' : '#852AD3'}
    border="1px solid #852AD3"
    variant="empty"
    _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
    {...props}
  />
);

export default memo(RecommendationsForm, (prev, next) => {
  return prev.isLoading === next.isLoading;
});

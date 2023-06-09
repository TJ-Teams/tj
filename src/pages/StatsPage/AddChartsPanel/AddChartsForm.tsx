import {
  Box,
  BoxProps,
  Button as BaseButton,
  ButtonProps,
  Checkbox,
  Grid,
  HStack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, Fragment, useState } from 'react';
import { useForceUpdate, useValue } from '~/hooks';
import { Chart, chartLabels } from '../types';
import { useStatsContext } from '../stats-context';
import SelectDataRange from '../../../components/SelectDataRange';
import { StatisticsType } from '~/types/statistics';

type Props = {
  onSubmit?: (charts: Chart[]) => void;
} & Omit<BoxProps, 'onSubmit'>;

const AddChartsForm = ({ onSubmit, ...props }: Props) => {
  const forceUpdate = useForceUpdate();
  const { parametersMap, chosenParameterKeys, subscriptions } =
    useStatsContext();
  const dateRange = useValue<{ startDate?: Date; endDate?: Date }>({});
  const chosenCharts = useValue(
    new Map<string, { parameterKey: string; chartType: StatisticsType }>()
  );
  const [isValid, setIsValid] = useState(false);

  subscriptions.useSubscribe('chosen-parameters', forceUpdate);

  const handleDateRangeChange = (startDate?: Date, endDate?: Date) => {
    dateRange.set({ startDate, endDate });
    setIsValid(Boolean(startDate && endDate));
  };

  const handleChooseChart =
    (parameterKey: string, chartType: StatisticsType) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const isChosen = e.currentTarget.checked;
      const key = `${parameterKey}:${chartType}`;
      if (isChosen) {
        chosenCharts.get.set(key, { parameterKey, chartType });
      } else {
        chosenCharts.get.delete(key);
      }
    };

  const handleSubmit = () => {
    const { startDate, endDate } = dateRange.get;
    if (!startDate || !endDate || chosenCharts.get.size === 0) return;

    const charts = [...chosenCharts.get.values()].map<Chart>(
      ({ parameterKey, chartType }) => ({
        parameterKey,
        type: chartType,
        startDate,
        endDate,
      })
    );

    onSubmit?.(charts);
  };

  return (
    <Box {...props}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <SelectDataRange onChange={handleDateRangeChange} />
        <Spacer />
        <Button
          isDisabled={!isValid}
          onClick={handleSubmit}
          children="Построить график"
        />
      </Stack>
      <Grid
        mt={6}
        gridGap={{ base: 4, md: 6 }}
        gridTemplateColumns="1.75fr repeat(3, 1fr)"
        gridAutoRows="24px"
        alignItems="center"
        fontSize={{ base: '12px', md: '16px' }}
      >
        <Spacer />
        {Object.values(chartLabels).map(({ label }, i) => (
          <Text justifySelf="center" key={i} children={label} />
        ))}
        {chosenParameterKeys.get.map((key) => {
          const parameter = parametersMap.get(key);
          if (!parameter) return null;
          return (
            <Fragment key={key}>
              <Text children={parameter.name} />
              {Object.keys(chartLabels).map((type) => (
                <Checkbox
                  key={type}
                  justifySelf="center"
                  onChange={handleChooseChart(key, type as StatisticsType)}
                />
              ))}
            </Fragment>
          );
        })}
      </Grid>
    </Box>
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
    w={{ base: 'full', sm: 'fit-content' }}
    _hover={{ opacity: 0.8 }}
    _active={{ opacity: 0.9 }}
    {...props}
  />
);

export default AddChartsForm;

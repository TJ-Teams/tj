import { Grid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useForceUpdate } from '~/hooks';
import { Chart, chartLabels, getChartKey } from '../types';
import { useStatsContext } from '../stats-context';
import BarChart from './BarChart';
import PieChart from './PieChart';
import stc from 'string-to-color';
import api from '~/api';
import { useQueryClient } from '@tanstack/react-query';

const ChartsGrid = () => {
  const forceUpdate = useForceUpdate();
  const queryClient = useQueryClient();
  const { charts, parametersMap, subscriptions } = useStatsContext();

  subscriptions.useSubscribe('charts', forceUpdate);

  const handleChartRemove = (chartKey: string) => () => {
    const newChart = charts.get.filter((c) => getChartKey(c) !== chartKey);
    charts.set(newChart);
    queryClient.removeQueries({ queryKey: [chartKey] });
    forceUpdate();
  };

  return (
    <Grid
      mx={{ base: 4, md: 8 }}
      mb={{ base: 4, md: 8 }}
      mt={{ base: 4, xl: 20 }}
      gridAutoRows="500px"
      gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
      gridGap="20px"
    >
      {charts.get.map((c) => {
        const title = parametersMap.get(c.parameterKey)?.name;
        if (!title) return null;
        const info = chartInfo[c.type];
        const chartKey = getChartKey(c);
        const loadData = async () => {
          try {
            const stats = await api.statistics.getStatistics(
              c.startDate,
              c.endDate,
              [c.parameterKey]
            );
            const chartData = stats[c.parameterKey]?.map((v) => ({
              name: v.name,
              value: v[c.type],
              count: v.volume,
              color: stc(v.name),
            }));
            return chartData || [];
          } catch (error) {
            return [];
          }
        };
        return (
          <info.Chart
            key={chartKey}
            chartKey={chartKey}
            title={title}
            subTitle={getChartSubtitle(c)}
            valueLabel={info.valueLabel}
            loadData={loadData}
            onRemove={handleChartRemove(chartKey)}
            domain={'domain' in info ? info.domain : undefined}
          />
        );
      })}
    </Grid>
  );
};

const getChartSubtitle = ({ type, startDate, endDate }: Chart): string => {
  const label = chartLabels[type].label;
  const start = dayjs(startDate).format('DD.MM.YYYY');
  const end = dayjs(endDate).format('DD.MM.YYYY');
  if (start === end) return `${label}\n${start}`;
  return `${label}\n${start} - ${end}`;
};

const chartInfo = {
  volume: {
    Chart: PieChart,
    valueLabel: 'Объем',
  },
  accuracy: {
    Chart: BarChart,
    valueLabel: 'Точность',
    domain: [0, 100] as [number, number],
  },
  profitability: {
    Chart: BarChart,
    valueLabel: 'Доход',
  },
} as const;

export default ChartsGrid;

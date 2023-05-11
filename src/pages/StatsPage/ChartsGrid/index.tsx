import { Grid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useForceUpdate } from '~/hooks';
import { Chart, chartLabels, getChartKey } from '../types';
import { useStatsContext } from '../stats-context';
import BarChart from './BarChart';
import PieChart from './PieChart';
import stc from 'string-to-color';
import api from '~/api';

const ChartsGrid = () => {
  const forceUpdate = useForceUpdate();
  const { charts, parametersMap, subscriptions } = useStatsContext();

  subscriptions.useSubscribe('charts', forceUpdate);

  const handleChartRemove = (chartKey: string) => () => {
    const newChart = charts.get.filter((c) => getChartKey(c) !== chartKey);
    charts.set(newChart);
    forceUpdate();
  };

  return (
    <Grid
      m={8}
      mt={20}
      gridAutoRows="500px"
      gridTemplateColumns="1fr 1fr"
      gridGap="20px"
    >
      {charts.get.map((c) => {
        const title = parametersMap.get(c.parameterKey)?.name;
        if (!title) return null;
        const Chart = chartComponent[c.type];
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
              color: stc(v.name),
            }));
            return chartData || [];
          } catch (error) {
            return [];
          }
        };
        return (
          <Chart
            key={chartKey}
            chartKey={chartKey}
            title={title}
            subTitle={getChartSubtitle(c)}
            loadData={loadData}
            onRemove={handleChartRemove(chartKey)}
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

const chartComponent = {
  volume: PieChart,
  accuracy: BarChart,
  profitability: BarChart,
} as const;

export default ChartsGrid;

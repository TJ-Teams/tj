import { Grid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useForceUpdate } from '~/hooks';
import { Chart, chartTypes, getChartKey } from '../chart-type';
import { useStatsContext } from '../stats-context';
import BarChart from './BarChart';
import PieChart from './PieChart';

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
        return (
          <Chart
            key={chartKey}
            chartKey={chartKey}
            title={title}
            subTitle={getChartSubtitle(c)}
            data={chartData[c.type]}
            onRemove={handleChartRemove(chartKey)}
          />
        );
      })}
    </Grid>
  );
};

const getChartSubtitle = ({ type, startDate, endDate }: Chart): string => {
  const label = chartTypes[type].label;
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

const data1 = [
  {
    name: 'Клин',
    value: 70,
    color: '#437FDF',
  },
  {
    name: 'Двойное дно',
    value: 40,
    color: '#889BD3',
  },
  {
    name: 'Пробой',
    value: 86,
    color: '#BFDFFF',
  },
];

const data2 = [
  {
    name: 'Клин',
    value: -290,
    color: '#9B4DDF',
  },
  {
    name: 'Двойное дно',
    value: 880,
    color: '#C99EEF',
  },
  {
    name: 'Пробой',
    value: 400,
    color: '#6520A0',
  },
];

const data3 = [
  {
    name: 'Здравоохранения',
    value: 48,
    color: '#FDBE1E',
  },
  {
    name: 'Технический',
    value: 152,
    color: '#20D4BE',
  },
];

const chartData = {
  volume: data3,
  accuracy: data1,
  profitability: data2,
} as const;

export default ChartsGrid;

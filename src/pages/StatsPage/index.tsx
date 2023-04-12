import { Grid } from '@chakra-ui/react';
import BarChart from './BarChart';
import PieChart from './PieChart';

const StatsPage = () => (
  <Grid m={8} gridAutoRows="500px" gridTemplateColumns="1fr 1fr" gridGap="20px">
    <BarChart title="Точность, %" data={data1} />
    <BarChart title="Доходность" data={data2} />
    <PieChart title="Сектора" data={data3} />
  </Grid>
);

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

export default StatsPage;

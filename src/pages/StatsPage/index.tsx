import { Box, Grid } from '@chakra-ui/react';
import AddChartsMenu from './AddChartsPanel';
import BarChart from './ChartsGrid/BarChart';
import ChartsGrid from './ChartsGrid';
import PieChart from './ChartsGrid/PieChart';
import { StatsProvider } from './stats-context';

const StatsPage = () => (
  <StatsProvider>
    <AddChartsMenu />
    <ChartsGrid />
  </StatsProvider>
);

export default StatsPage;

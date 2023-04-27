import AddChartsMenu from './AddChartsPanel';
import ChartsGrid from './ChartsGrid';
import { StatsProvider } from './stats-context';

const StatsPage = () => (
  <StatsProvider>
    <AddChartsMenu />
    <ChartsGrid />
  </StatsProvider>
);

export default StatsPage;

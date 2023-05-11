import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart as RPieChart,
  PieLabel,
  PieLabelRenderProps,
  Tooltip,
} from 'recharts';
import { ContentType } from 'recharts/types/component/DefaultLegendContent';
import { useLoadingState, useMethodAfterMount, useValue } from '~/hooks';
import ChartLayout, { ChartLayoutProps } from './ChartLayout';
import { ChartData } from './types';

type Props = {
  chartKey: string;
  loadData: () => Promise<ChartData[]>;
} & ChartLayoutProps;

const PieChart = ({ title, subTitle, loadData, onRemove }: Props) => {
  const data = useValue<ChartData[]>([]);
  const { isLoading, setIsLoading } = useLoadingState(true);

  useMethodAfterMount(loadData, {
    onStartLoading: setIsLoading.on,
    onEndLoading: setIsLoading.off,
    next: data.set,
  });

  return (
    <ChartLayout
      title={title}
      subTitle={subTitle}
      isLoading={isLoading}
      isEmpty={data.get.length === 0}
      onRemove={onRemove}
    >
      <RPieChart>
        <Pie
          data={data.get}
          dataKey="value"
          innerRadius="35%"
          labelLine={false}
          label={renderCustomizedLabel}
          children={data.get.map((item, index) => (
            <Cell key={index} fill={item.color} />
          ))}
        />
        <Tooltip separator="" formatter={() => ''} />
        <Legend
          iconType="circle"
          layout="vertical"
          align="right"
          verticalAlign="middle"
          content={renderLegend}
        />
      </RPieChart>
    </ChartLayout>
  );
};

const renderCustomizedLabel: PieLabel<PieLabelRenderProps> = ({
  cx = 0,
  cy = 0,
  midAngle,
  outerRadius = 0,
  fill,
  percent = 0,
}) => {
  const radian = Math.PI / 180;
  const sin = Math.sin(-radian * midAngle);
  const cos = Math.cos(-radian * midAngle);
  const sx = +cx + (+outerRadius - 1) * cos;
  const sy = +cy + (+outerRadius - 1) * sin;
  const mx = +cx + (+outerRadius + 30) * cos;
  const my = +cy + (+outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 40;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <text
        x={ex + (cos < 0 ? 1 : -1) * 35}
        y={ey - 4}
        textAnchor={textAnchor}
        fill="black"
        children={`${+(percent * 100).toFixed(1)}%`}
      />
    </g>
  );
};

const renderLegend: ContentType = ({ payload }) => {
  return (
    <Box pl={6} pr={2} maxW="200px" h="375px" overflowY="auto">
      <ul>
        {payload?.map((entry, i) => (
          <li key={i} style={{ color: entry.color }}>
            {entry.value}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default memo(PieChart, (prev, next) => prev.chartKey === next.chartKey);

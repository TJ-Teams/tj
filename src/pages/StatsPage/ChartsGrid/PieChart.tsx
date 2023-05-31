import { Box, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import {
  Cell,
  Legend,
  LegendProps,
  Pie,
  PieChart as RPieChart,
  PieLabel,
  PieLabelRenderProps,
  Tooltip,
  TooltipProps,
} from 'recharts';
import ChartLayout, { ChartLayoutProps } from './ChartLayout';
import { ChartData } from './types';

type Props = {
  chartKey: string;
  loadData: () => Promise<ChartData[]>;
} & ChartLayoutProps;

const PieChart = ({ chartKey, title, subTitle, loadData, onRemove }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [chartKey],
    queryFn: loadData,
  });

  return (
    <ChartLayout
      title={title}
      subTitle={subTitle}
      isLoading={isLoading}
      isEmpty={!data?.length}
      onRemove={onRemove}
    >
      <RPieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius="35%"
          labelLine={false}
          label={renderCustomizedLabel}
          children={data?.map((item, index) => (
            <Cell key={index} fill={item.color} />
          ))}
        />
        <Tooltip isAnimationActive={false} content={tooltipContent} />
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

const renderLegend: LegendProps['content'] = ({ payload }) => {
  return (
    <Box
      pr={2}
      maxW="200px"
      h="400px"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'white',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#D3D3D3',
          borderRadius: '2px',
        },
      }}
    >
      <UnorderedList pl={2}>
        {payload?.map((entry, i) => (
          <ListItem key={i} color={entry.color} fontWeight="semibold">
            {entry.value}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const tooltipContent: TooltipProps<number, string>['content'] = (props) => {
  const item = props.payload?.at(0);
  const label = item?.name;
  const count = item?.payload?.count;

  if (!label) {
    return null;
  }

  return (
    <Stack
      px={3}
      py={3}
      spacing={1}
      bg="white"
      border="1px solid"
      borderColor="neutral.3"
      boxShadow="base"
      borderRadius={4}
      fontSize="14px"
    >
      <Text fontWeight="semibold" children={label} />
      <Text children={`Cделок: ${count || 0}`} />
    </Stack>
  );
};

export default memo(PieChart, (prev, next) => prev.chartKey === next.chartKey);

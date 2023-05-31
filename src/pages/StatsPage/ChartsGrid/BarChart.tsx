import { Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import ChartLayout, { ChartLayoutProps } from './ChartLayout';
import { ChartData } from './types';

type Props = {
  chartKey: string;
  loadData: () => Promise<ChartData[]>;
  valueLabel: string;
  domain?: [number, number];
} & ChartLayoutProps;

const BarChart = ({
  chartKey,
  title,
  subTitle,
  valueLabel,
  domain,
  loadData,
  onRemove,
}: Props) => {
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
      <RBarChart data={data} maxBarSize={55}>
        <CartesianGrid
          strokeDasharray="4"
          verticalCoordinatesGenerator={(props) => {
            if (!data) return [];
            const range = props.offset?.width / data.length;
            return data.map((_, i) => props.offset?.left + range * (i + 1));
          }}
        />
        <XAxis dataKey="name" />
        <YAxis
          type="number"
          tickFormatter={tickFormatter}
          domain={
            domain || [(min: number) => (min < 0 ? min * 1.1 : min), 'auto']
          }
        />
        <Tooltip
          isAnimationActive={false}
          content={tooltipContent(valueLabel)}
        />
        <ReferenceLine y={0} stroke="rgb(102, 102, 102)" />
        <Bar dataKey="value">
          <LabelList
            fill="black"
            position="top"
            valueAccessor={(e: { value: number }) => +e.value.toFixed(1)}
          />
          {data?.map((item, index) => (
            <Cell key={index} fill={item.color} />
          ))}
        </Bar>
      </RBarChart>
    </ChartLayout>
  );
};

const tickFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? +(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k'
    : (+(Math.sign(num) * Math.abs(num)).toFixed(1)).toString();
};

const tooltipContent =
  (valueLabel: string): TooltipProps<number, string>['content'] =>
  (props) => {
    const item = props.payload?.at(0);
    const label = props.label;
    const value = item?.value;
    const count = item?.payload?.count;

    if (!label || value === undefined) {
      return null;
    }

    const normalizedValue = +(+value).toFixed(1);

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
        <Text children={`${valueLabel}: ${normalizedValue}`} />
        <Text children={`Сделок: ${count || 0}`} />
      </Stack>
    );
  };

export default memo(BarChart, (prev, next) => prev.chartKey === next.chartKey);

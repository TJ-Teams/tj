import { memo } from 'react';
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLoadingState, useMethodAfterMount, useValue } from '~/hooks';
import ChartLayout, { ChartLayoutProps } from './ChartLayout';
import { ChartData } from './types';

type Props = {
  chartKey: string;
  loadData: () => Promise<ChartData[]>;
  domain?: [number, number];
} & ChartLayoutProps;

const BarChart = ({ title, subTitle, domain, loadData, onRemove }: Props) => {
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
      <RBarChart data={data.get} maxBarSize={55}>
        <CartesianGrid
          strokeDasharray="4"
          verticalCoordinatesGenerator={(props) => {
            const range = props.offset?.width / data.get.length;
            return data.get.map((_, i) => props.offset?.left + range * (i + 1));
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
        <Tooltip formatter={(value) => +(+value).toFixed(1)} />
        <ReferenceLine y={0} stroke="rgb(102, 102, 102)" />
        <Bar dataKey="value">
          <LabelList
            fill="black"
            position="top"
            valueAccessor={(e: { value: number }) => +e.value.toFixed(1)}
          />
          {data.get.map((item, index) => (
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

export default memo(BarChart, (prev, next) => prev.chartKey === next.chartKey);

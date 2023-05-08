import { memo } from 'react';
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import ChartLayout, { ChartLayoutProps } from './ChartLayout';

type Props = {
  chartKey: string;
  data: { name: string; value: number; color: string }[];
} & ChartLayoutProps;

const BarChart = ({ title, subTitle, data, onRemove }: Props) => (
  <ChartLayout
    title={title}
    subTitle={subTitle}
    isEmpty={data.length === 0}
    onRemove={onRemove}
  >
    <RBarChart data={data} maxBarSize={55}>
      <CartesianGrid
        strokeDasharray="4"
        verticalCoordinatesGenerator={(props) => {
          const range = props.offset?.width / data.length;
          return data.map((_, i) => props.offset?.left + range * (i + 1));
        }}
      />
      <XAxis dataKey="name" />
      <YAxis
        type="number"
        tickFormatter={tickFormatter}
        domain={[(min: number) => (min < 0 ? min * 1.1 : min), 'auto']}
      />
      <ReferenceLine y={0} stroke="rgb(102, 102, 102)" />
      <Bar dataKey="value">
        <LabelList
          fill="black"
          position="top"
          valueAccessor={(e: { value: number }) => +e.value.toFixed(1)}
        />
        {data.map((item, index) => (
          <Cell key={index} fill={item.color} />
        ))}
      </Bar>
    </RBarChart>
  </ChartLayout>
);

const tickFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? +(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k'
    : (+(Math.sign(num) * Math.abs(num)).toFixed(1)).toString();
};

export default memo(BarChart, (prev, next) => prev.chartKey === next.chartKey);

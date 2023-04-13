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
import ChartLayout from './ChartLayout';

type Props = {
  title: string;
  unitName: string;
  data: { name: string; value: number; color: string }[];
};

const BarChart = ({ title, unitName, data }: Props) => (
  <ChartLayout title={title} unitName={unitName}>
    <RBarChart data={data} maxBarSize={55}>
      <CartesianGrid
        strokeDasharray="4"
        verticalCoordinatesGenerator={(props) => {
          const range = props.offset?.width / data.length;
          return data.map((_, i) => props.offset?.left + range * (i + 1));
        }}
      />
      <XAxis dataKey="name" />
      <YAxis />
      <ReferenceLine y={0} stroke="rgb(102, 102, 102)" />
      <Bar dataKey="value">
        <LabelList fill="black" position="insideTop" />
        {data.map((item, index) => (
          <Cell key={index} fill={item.color} />
        ))}
      </Bar>
    </RBarChart>
  </ChartLayout>
);

export default BarChart;

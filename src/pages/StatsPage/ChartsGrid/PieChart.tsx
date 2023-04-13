import {
  Cell,
  Legend,
  Pie,
  PieChart as RPieChart,
  PieLabel,
  PieLabelRenderProps,
} from 'recharts';
import ChartLayout from './ChartLayout';

type Props = {
  title: string;
  unitName: string;
  data: { name: string; value: number; color: string }[];
};

const PieChart = ({ title, unitName, data }: Props) => (
  <ChartLayout title={title} unitName={unitName}>
    <RPieChart>
      <Pie
        data={data}
        dataKey="value"
        innerRadius="35%"
        labelLine={false}
        label={renderCustomizedLabel}
        children={data.map((item, index) => (
          <Cell key={index} fill={item.color} />
        ))}
      />
      <Legend
        iconType="circle"
        layout="vertical"
        align="right"
        verticalAlign="middle"
      />
    </RPieChart>
  </ChartLayout>
);

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
        y={ey - 8}
        textAnchor={textAnchor}
        fill="black"
        children={`${(percent * 100).toFixed(0)}%`}
      />
    </g>
  );
};

export default PieChart;

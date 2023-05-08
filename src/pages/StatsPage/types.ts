import dayjs from 'dayjs';
import { StatisticsType } from '~/types/statistics';

export type Chart = {
  parameterKey: string;
  type: StatisticsType;
  startDate: Date;
  endDate: Date;
};

export const chartLabels: Record<StatisticsType, { label: string }> = {
  volume: { label: 'Объем' },
  accuracy: { label: 'Точность' },
  profitability: { label: 'Доходность' },
};

export const getChartKey = ({
  parameterKey,
  type,
  startDate,
  endDate,
}: Chart): string => {
  return [
    parameterKey,
    type,
    dayjs(startDate).format('DD.MM.YYYY'),
    dayjs(endDate).format('DD.MM.YYYY'),
  ].join('|');
};

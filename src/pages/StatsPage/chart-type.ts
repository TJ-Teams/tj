import dayjs from 'dayjs';

export type ChartType = 'volume' | 'accuracy' | 'profitability';

export type Chart = {
  parameterKey: string;
  type: ChartType;
  startDate: Date;
  endDate: Date;
};

export const chartTypes: Record<ChartType, { label: string }> = {
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

export type StatisticsType = 'volume' | 'accuracy' | 'profitability';

export type Statistics = Record<
  string,
  { name: string; accuracy: number; profitability: number; volume: number }[]
>;

export type StatisticsDto = Record<
  string,
  Record<string, { accuracy: number; profit: number; value: number }>
>;

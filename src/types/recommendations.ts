export type Recommendation = {
  marketplace: string;
  tradingMode: string;
  name: string;
  broker: string;
  analyticsSum: number;
  analyticsCountPlus: number;
  analyticsCountMinus: number;
};

export type RecommendationsResponse = {
  data: Recommendation[];
};

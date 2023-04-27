import { Flex, HStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '~/api';
import { useValue } from '~/hooks';
import { Recommendation } from '~/types/recommendations';
import safelyLocalStorage from '~/utils/safely-local-storage';
import RatingTable from './RatingTable';
import RecommendationsForm from './RecommendationsForm';
import RecommendationsTable from './RecommendationsTable';
import { TopData } from './types';

const startDateKey = 'recommendations:start-date';
const endDateKey = 'recommendations:end-date';

const RecommendationsPage = () => {
  const startDate = useValue(getDateFromStorage(startDateKey), {
    onUpdate: saveDateToStorage(startDateKey),
  });
  const endDate = useValue(getDateFromStorage(endDateKey), {
    onUpdate: saveDateToStorage(endDateKey),
  });
  const [topInAccuracy, setTopInAccuracy] = useState<TopData[]>([]);

  const handleLoad = async (start: Date, end: Date) => {
    startDate.set(start);
    endDate.set(end);
    const data = await api.recommendations.getRecommendations(start, end);

    setTopInAccuracy(calculateTopData(data));
  };

  useEffect(() => {
    if (!startDate.get || !endDate.get) return;
    handleLoad(startDate.get, endDate.get);
  }, []);

  const hasDate = Boolean(startDate.get && endDate.get);

  return (
    <Flex py="36px" align="center" flexDir="column" whiteSpace="break-spaces">
      <RecommendationsForm
        defaultStartDate={startDate.get}
        defaultEndDate={endDate.get}
        w="min(700px, 95%)"
        onSubmit={handleLoad}
      />
      {hasDate && (
        <HStack mt="36px" w="80vw" spacing="70px" align="flex-start">
          <RatingTable
            title="Лучшие стратегии"
            data={getTop5ByAccuracy(topInAccuracy)}
            colors={topColors}
          />
          <RatingTable
            title="Худшие стратегии"
            data={getBottom5ByAccuracy(topInAccuracy)}
            colors={bottomColors}
          />
        </HStack>
      )}
      {hasDate && (
        <RecommendationsTable mt="70px" w="65vw" data={topInAccuracy} />
      )}
    </Flex>
  );
};

const getDateFromStorage = (key: string): Date | undefined => {
  const date = safelyLocalStorage.get(key);
  if (!date) return undefined;
  const normalizedDate = dayjs.utc(date);
  return normalizedDate.isValid() ? normalizedDate.toDate() : undefined;
};

const saveDateToStorage = (key: string) => (date: Date | undefined) => {
  if (date) {
    safelyLocalStorage.set(key, date.toISOString());
  } else {
    safelyLocalStorage.remove(key);
  }
};

const calculateTopData = (recommendations: Recommendation[]): TopData[] => {
  let totalProfitability = 0;

  const topData = recommendations
    .map<TopData>((r) => {
      totalProfitability += r.analyticsSum;
      return {
        name: `${r.marketplace}, ${r.tradingMode}, ${r.broker}`,
        accuracy: calculateAccuracy(r),
        profitability: r.analyticsSum,
        // percentageProfitability: 0,
      };
    })
    // .map((d) => ({
    //   ...d,
    //   percentageProfitability: (d.profitability / totalProfitability) * 100,
    // }))
    .sort((a, b) => b.accuracy - a.accuracy);

  return topData;
};

const calculateAccuracy = (r: Recommendation): number => {
  const total = r.analyticsCountPlus + r.analyticsCountMinus;
  return (r.analyticsCountPlus / total) * 100;
};

const getTop5ByAccuracy = (data: TopData[]) => {
  return data
    .slice(0, 5)
    .filter((d) => d.accuracy >= 50)
    .map((d) => ({ name: d.name, value: d.accuracy }));
};

const getBottom5ByAccuracy = (data: TopData[]) => {
  return data
    .slice(-5)
    .filter((d) => d.accuracy < 50)
    .map((d) => ({ name: d.name, value: d.accuracy }));
};

const topColors = [
  '#852AD3',
  'rgba(133, 42, 211, 0.88)',
  'rgba(133, 42, 211, 0.75)',
  'rgba(133, 42, 211, 0.6)',
  'rgba(133, 42, 211, 0.55)',
];

const bottomColors = [
  'rgba(161, 16, 68, 0.65)',
  'rgba(161, 16, 68, 0.75)',
  'rgba(161, 16, 68, 0.85)',
  'rgba(161, 16, 68, 0.95)',
  '#A11044',
];

export default RecommendationsPage;

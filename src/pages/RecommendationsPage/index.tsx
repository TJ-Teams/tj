import { Flex, HStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useLoadingState, useValue } from '~/hooks';
import { Recommendation } from '~/types/recommendations';
import safelyLocalStorage from '~/utils/safely-local-storage';
import RatingTable from './RatingTable';
import { RecommendationsProvider } from './recommendations-context';
import RecommendationsForm from './RecommendationsForm';
import RecommendationsTable from './RecommendationsTable';
import { TopData } from './types';

const startDateKey = 'recommendations:start-date';
const endDateKey = 'recommendations:end-date';
const parametersKey = 'recommendations:parameters';

const RecommendationsPage = () => {
  const { isLoading, trackLoading } = useLoadingState(false);

  const parameterKeys = useValue(
    safelyLocalStorage.getJsonOrElse<string[]>(parametersKey, []),
    { onUpdate: (p) => safelyLocalStorage.setJson(parametersKey, p) }
  );
  const startDate = useValue(getDateFromStorage(startDateKey), {
    onUpdate: saveDateToStorage(startDateKey),
  });
  const endDate = useValue(getDateFromStorage(endDateKey), {
    onUpdate: saveDateToStorage(endDateKey),
  });
  const [topInAccuracy, setTopInAccuracy] = useState<TopData[]>([]);

  const handleLoad = (start: Date, end: Date, keys: string[]) =>
    trackLoading(async () => {
      startDate.set(start);
      endDate.set(end);
      parameterKeys.set(keys);
      const data = await api.recommendations.getRecommendations(
        start,
        end,
        keys
      );

      setTopInAccuracy(calculateTopData(data));
    })();

  useEffect(() => {
    if (!startDate.get || !endDate.get || parameterKeys.get.length === 0)
      return;
    handleLoad(startDate.get, endDate.get, parameterKeys.get);
  }, []);

  const hasData = !isLoading && Boolean(startDate.get && endDate.get);

  return (
    <RecommendationsProvider>
      <Flex
        flex={1}
        py="36px"
        align="center"
        flexDir="column"
        whiteSpace="break-spaces"
      >
        <RecommendationsForm
          isLoading={isLoading}
          defaultParameterKeys={parameterKeys.get}
          defaultStartDate={startDate.get}
          defaultEndDate={endDate.get}
          w="min(700px, 95%)"
          onSubmit={handleLoad}
        />
        {hasData && (
          <HStack mt="36px" w="80vw" spacing="70px" align="flex-start">
            <RatingTable
              title="Лучшие стратегии"
              colors={topColors}
              data={getTop3ByAccuracy(topInAccuracy).map(
                ({ accuracy, profitability, ...d }) => ({
                  name: Object.values(d).join(', '),
                  value: accuracy,
                })
              )}
            />
            <RatingTable
              title="Худшие стратегии"
              colors={bottomColors}
              data={getBottom3ByAccuracy(topInAccuracy).map(
                ({ accuracy, profitability, ...d }) => ({
                  name: Object.values(d).join(', '),
                  value: accuracy,
                })
              )}
            />
          </HStack>
        )}
        {hasData && (
          <RecommendationsTable mt="70px" w="75vw" data={topInAccuracy} />
        )}
        {isLoading && <PageLoader />}
      </Flex>
    </RecommendationsProvider>
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
  const topData = recommendations
    .map<TopData>(
      ({ analyticsSum, analyticsCountPlus, analyticsCountMinus, ...r }) => ({
        ...r,
        accuracy: calculateAccuracy(analyticsCountPlus, analyticsCountMinus),
        profitability: analyticsSum,
      })
    )
    .sort((a, b) => b.accuracy - a.accuracy);

  return topData;
};

const calculateAccuracy = (
  analyticsCountPlus: number,
  analyticsCountMinus: number
): number => {
  const total = analyticsCountPlus + analyticsCountMinus;
  return (analyticsCountPlus / total) * 100;
};

const getTop3ByAccuracy = (data: TopData[]) => {
  return data.slice(0, 3).filter((d) => d.accuracy >= 50);
};

const getBottom3ByAccuracy = (data: TopData[]) => {
  return data.slice(-3).filter((d) => d.accuracy < 50);
};

const topColors = [
  '#852AD3',
  'rgba(133, 42, 211, 0.75)',
  'rgba(133, 42, 211, 0.55)',
];

const bottomColors = [
  'rgba(161, 16, 68, 0.65)',
  'rgba(161, 16, 68, 0.85)',
  '#A11044',
];

export default RecommendationsPage;

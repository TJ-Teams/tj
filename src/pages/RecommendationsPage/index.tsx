import { Flex, Stack } from '@chakra-ui/react';
import { QueryFunction, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { Recommendation } from '~/types/recommendations';
import safelyLocalStorage from '~/utils/safely-local-storage';
import RatingTable from './RatingTable';
import { RecommendationsProvider } from './recommendations-context';
import RecommendationsForm from './RecommendationsForm';
import RecommendationsTable from './RecommendationsTable';
import { TopData } from './types';

type RecommendationsState = {
  startDate: Date;
  endDate: Date;
  parameterKeys: string[];
};

const stateStorageKey = 'recommendations:state';

const RecommendationsPage = () => {
  const [state, setState] = useState(getStateFromStorage(stateStorageKey));

  const { data, isInitialLoading } = useQuery({
    enabled: !!state,
    queryKey: [state],
    queryFn: fetchRecommendations,
    select: calculateTopData,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (
    startDate: Date,
    endDate: Date,
    parameterKeys: string[]
  ) => {
    const newState = { startDate, endDate, parameterKeys };
    safelyLocalStorage.setJson(stateStorageKey, newState);
    setState(newState);
  };

  const hasData = !!(!isInitialLoading && data);

  return (
    <RecommendationsProvider>
      <Flex
        flex={1}
        py={{ base: '14px', md: '36px' }}
        align="center"
        flexDir="column"
        whiteSpace="break-spaces"
      >
        <RecommendationsForm
          isLoading={isInitialLoading}
          defaultParameterKeys={state?.parameterKeys}
          defaultStartDate={state?.startDate}
          defaultEndDate={state?.endDate}
          w="min(700px, 95%)"
          onSubmit={handleSubmit}
        />
        {hasData && (
          <Stack
            mt="36px"
            w={{ base: '95vw', xl: '80vw' }}
            spacing={{ base: '16px', md: '32px', xl: '70px' }}
            align="flex-start"
            direction={{ base: 'column', lg: 'row' }}
          >
            <RatingTable
              title="Лучшие стратегии"
              colors={topColors}
              data={getTop3ByAccuracy(data).map(
                ({ accuracy, profitability, ...d }) => ({
                  name: Object.values(d).join(', '),
                  value: accuracy,
                })
              )}
            />
            <RatingTable
              title="Худшие стратегии"
              colors={bottomColors}
              data={getBottom3ByAccuracy(data).map(
                ({ accuracy, profitability, ...d }) => ({
                  name: Object.values(d).join(', '),
                  value: accuracy,
                })
              )}
            />
          </Stack>
        )}
        {hasData && (
          <RecommendationsTable
            mt={{ base: '16px', md: '32px', xl: '70px' }}
            w={{ base: '95vw', xl: '75vw' }}
            data={data}
          />
        )}
        {isInitialLoading && <PageLoader />}
      </Flex>
    </RecommendationsProvider>
  );
};

const fetchRecommendations: QueryFunction<
  Recommendation[],
  readonly [RecommendationsState | undefined]
> = async ({ queryKey }) => {
  const [state] = queryKey;

  if (!state) return [];

  const result = await api.recommendations.getRecommendations(
    state.startDate,
    state.endDate,
    state.parameterKeys
  );

  return result;
};

const getStateFromStorage =
  (key: string) => (): RecommendationsState | undefined => {
    const state = safelyLocalStorage.getJsonOrElse<
      RecommendationsState | undefined
    >(key, undefined);

    if (!state) return undefined;

    return {
      ...state,
      startDate: dayjs.utc(state.startDate).toDate(),
      endDate: dayjs.utc(state.endDate).toDate(),
    };
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

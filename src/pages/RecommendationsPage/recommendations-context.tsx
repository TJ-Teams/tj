import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useLoadingState, useMethodAfterMount } from '~/hooks';
import useValue from '~/hooks/useValue';
import { Parameter } from '~/types/deals';

type RecommendationsContent = {
  parametersMap: Map<string, Parameter>;
};

type RecommendationsProviderProps = {
  children: ReactNode;
};

const RecommendationsContext = createContext<RecommendationsContent>({
  parametersMap: new Map(),
});

export const useRecommendationsContext = (): RecommendationsContent =>
  useContext(RecommendationsContext);

const fetchParametersWithCache = (queryClient: QueryClient) => async () => {
  const { parameters } = await queryClient.fetchQuery({
    queryKey: ['deals'],
    staleTime: Infinity,
    queryFn: () => api.deals.getDeals(),
  });
  return parameters;
};

export const RecommendationsProvider = ({
  children,
}: RecommendationsProviderProps) => {
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useLoadingState(true);

  const parametersMap = useValue(new Map<string, Parameter>());

  useMethodAfterMount(fetchParametersWithCache(queryClient), {
    onStartLoading: setIsLoading.on,
    onEndLoading: setIsLoading.off,
    next: (loadedParams) => {
      parametersMap.set(new Map(loadedParams.map((p) => [p.key, p])));
    },
  });

  return (
    <RecommendationsContext.Provider
      value={{ parametersMap: parametersMap.get }}
      children={isLoading ? <PageLoader /> : children}
    />
  );
};

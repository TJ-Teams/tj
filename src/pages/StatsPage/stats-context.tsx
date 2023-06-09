import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import { Parameter } from '~/types/deals';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { Chart } from './types';

type SubscribeKey = 'charts' | 'chosen-parameters';

type StatsContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  charts: ValueRef<Chart[]>;
  chosenParameterKeys: ValueRef<string[]>;
  parametersMap: Map<string, Parameter>;
};

type StatsProviderProps = {
  children: ReactNode;
};

const DealsContext = createContext<StatsContent>({
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
  charts: { get: [], set: () => {} },
  chosenParameterKeys: { get: [], set: () => {} },
  parametersMap: new Map(),
});

export const useStatsContext = (): StatsContent => useContext(DealsContext);

const chartsStorageKey = 'stats-page:charts';
const paramsStorageKey = 'stats-page:chosen-params';

const fetchParametersWithCache = async (queryClient: QueryClient) => {
  const { parameters } = await queryClient.fetchQuery({
    queryKey: ['deals'],
    staleTime: Infinity,
    queryFn: () => api.deals.getDeals(),
  });
  return parameters;
};

export const StatsProvider = ({ children }: StatsProviderProps) => {
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useLoadingState(true);

  const subscriptions = useSubscriptions<SubscribeKey>();

  const charts = useValue([] as Chart[], {
    onUpdate: (d) => safelyLocalStorage.setJson(chartsStorageKey, d),
  });
  const chosenParameterKeys = useValue([] as string[], {
    onUpdate: (d) => safelyLocalStorage.setJson(paramsStorageKey, d),
  });
  const parametersMap = useValue(new Map<string, Parameter>());

  useMethodAfterMount(
    async () => {
      const parameters = await fetchParametersWithCache(queryClient);
      const charts = safelyLocalStorage.getJsonOrElse<Chart[]>(
        chartsStorageKey,
        []
      );
      const chosenParams = safelyLocalStorage.getJsonOrElse<string[]>(
        paramsStorageKey,
        parameters
          .filter((p) => p.type === 'string')
          .slice(0, 3)
          .map((p) => p.key)
      );
      return [parameters, charts, chosenParams] as const;
    },
    {
      onStartLoading: setIsLoading.on,
      onEndLoading: setIsLoading.off,
      next: ([loadedParams, loadedCharts, loadedChosenParams]) => {
        parametersMap.set(new Map(loadedParams.map((p) => [p.key, p])));
        charts.set(loadedCharts, true);
        chosenParameterKeys.set(loadedChosenParams, true);
      },
    }
  );

  return (
    <DealsContext.Provider
      value={{
        subscriptions,
        charts,
        chosenParameterKeys,
        parametersMap: parametersMap.get,
      }}
      children={isLoading ? <PageLoader /> : children}
    />
  );
};

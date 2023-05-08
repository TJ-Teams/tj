import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import { Parameter } from '~/types/deals';
import { Statistics } from '~/types/statistics';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { Chart } from './types';

type SubscribeKey = 'charts' | 'chosen-parameters';

type StatsContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  charts: ValueRef<Chart[]>;
  chosenParameterKeys: ValueRef<string[]>;
  parametersMap: Map<string, Parameter>;
  statistics: Statistics;
};

type StatsProviderProps = {
  children: ReactNode;
};

const DealsContext = createContext<StatsContent>({
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
  charts: { get: [], set: () => {} },
  chosenParameterKeys: { get: [], set: () => {} },
  parametersMap: new Map(),
  statistics: {},
});

export const useStatsContext = (): StatsContent => useContext(DealsContext);

const chartsStorageKey = 'stats-page:charts';
const paramsStorageKey = 'stats-page:chosen-params';

export const StatsProvider = ({ children }: StatsProviderProps) => {
  const { isLoading, setIsLoading } = useLoadingState(true);

  const subscriptions = useSubscriptions<SubscribeKey>();

  const charts = useValue([] as Chart[], {
    onUpdate: (d) => safelyLocalStorage.setJson(chartsStorageKey, d),
  });
  const chosenParameterKeys = useValue([] as string[], {
    onUpdate: (d) => safelyLocalStorage.setJson(paramsStorageKey, d),
  });
  const parametersMap = useValue(new Map<string, Parameter>());
  const statistics = useValue<Statistics>({});

  useMethodAfterMount(
    async () => {
      const [parameters] = await api.deals.getDeals();
      const statistics = await api.statistics.getStatistics();
      const charts = safelyLocalStorage.getJsonOrElse<Chart[]>(
        chartsStorageKey,
        []
      );
      const chosenParams = safelyLocalStorage.getJsonOrElse<string[]>(
        paramsStorageKey,
        ['broker', 'marketplace', 'trading-mode']
      );
      return [parameters, statistics, charts, chosenParams] as const;
    },
    {
      onStartLoading: setIsLoading.on,
      onEndLoading: setIsLoading.off,
      next: ([loadedParams, loadedStats, loadedCharts, loadedChosenParams]) => {
        parametersMap.set(new Map(loadedParams.map((p) => [p.key, p])));
        statistics.set(loadedStats);
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
        statistics: statistics.get,
      }}
      children={isLoading ? <PageLoader /> : children}
    />
  );
};

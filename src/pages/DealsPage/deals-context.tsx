import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useDebounce, useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import { Deal, Parameter } from '~/types/deals';
import { IndicatorStatus } from './BottomBar/SaveIndicator';

type SubscribeKey =
  | 'table'
  | 'table-key'
  | `id=${string};p=${string}:${string}`
  | `indicator:${IndicatorStatus}`;

type DealsContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  deals: ValueRef<Deal[]>;
  parameters: ValueRef<Parameter[]>;
  refetch: () => Promise<void>;
};

type DealsProviderProps = {
  children: ReactNode;
};

const DealsContext = createContext<DealsContent>({
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
  deals: { get: [], set: () => {} },
  parameters: { get: [], set: () => {} },
  refetch: async () => {},
});

export const useDealsContext = (): DealsContent => useContext(DealsContext);

export const DealsProvider = ({ children }: DealsProviderProps) => {
  const queryClient = useQueryClient();
  const debounce = useDebounce(2500);
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions<SubscribeKey>();

  const fetchDealsWithCache = async () => {
    const result = await queryClient.fetchQuery({
      queryKey: ['deals'],
      staleTime: Infinity,
      queryFn: () => api.deals.getDeals(),
    });
    return result;
  };

  const updateDeals = (parameters: Parameter[], deals: Deal[]) => {
    queryClient.setQueriesData(['deals'], [parameters, deals]);
    subscriptions.ping('indicator:not-saved');
    debounce.set(() => {
      subscriptions.ping('indicator:saved');
      api.deals.updateDeals(parameters, deals).then(
        (_) => subscriptions.ping('indicator:saved'),
        (_) => subscriptions.ping('indicator:error')
      );
    });
  };

  const deals = useValue([] as Deal[], {
    onUpdate: (d) => {
      updateDeals(parameters.get, d);
    },
  });
  const parameters = useValue([] as Parameter[], {
    onUpdate: (p) => {
      updateDeals(p, deals.get);
    },
  });

  useMethodAfterMount(fetchDealsWithCache, {
    onEndLoading: setIsLoading.off,
    onError: () => subscriptions.ping('indicator:error', 100),
    next: ([newParameters, newDeals]) => {
      parameters.set(newParameters, true);
      deals.set(newDeals, true);
    },
  });

  const refetch = async () => {
    await queryClient.invalidateQueries(['deals']);
    const [newParameters, newDeals] = await fetchDealsWithCache();
    parameters.set(newParameters, true);
    deals.set(newDeals, true);
  };

  if (isLoading) return <PageLoader />;

  return (
    <DealsContext.Provider
      value={{ subscriptions, deals, parameters, refetch }}
      children={children}
    />
  );
};

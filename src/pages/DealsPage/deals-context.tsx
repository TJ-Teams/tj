import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
import PageLoader from '~/components/PageLoader';
import { useDebounce, useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import { Deal, Deals, Parameter } from '~/types/deals';
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

const fetchDealsWithCache = async (queryClient: QueryClient) => {
  const result = await queryClient.fetchQuery({
    queryKey: ['deals'],
    staleTime: Infinity,
    queryFn: () => api.deals.getDeals(),
  });
  return result;
};

export const DealsProvider = ({ children }: DealsProviderProps) => {
  const queryClient = useQueryClient();
  const debounce = useDebounce(2500);
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions<SubscribeKey>();

  const updateDeals = (parameters: Parameter[], deals: Deal[]) => {
    queryClient.setQueriesData<Deals>(['deals'], { parameters, deals });
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

  useMethodAfterMount(() => fetchDealsWithCache(queryClient), {
    onEndLoading: setIsLoading.off,
    onError: () => subscriptions.ping('indicator:error', 100),
    next: (result) => {
      parameters.set(result.parameters, true);
      deals.set(result.deals, true);
    },
  });

  const refetch = async () => {
    queryClient.removeQueries();
    const result = await fetchDealsWithCache(queryClient);
    parameters.set(result.parameters, true);
    deals.set(result.deals, true);
  };

  if (isLoading) return <PageLoader />;

  return (
    <DealsContext.Provider
      value={{ subscriptions, deals, parameters, refetch }}
      children={children}
    />
  );
};

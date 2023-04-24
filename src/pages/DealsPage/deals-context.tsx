import { createContext, ReactNode, useContext } from 'react';
import api from '~/api';
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
};

type DealsProviderProps = {
  children: ReactNode;
};

const DealsContext = createContext<DealsContent>({
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
  deals: { get: [], set: () => {} },
  parameters: { get: [], set: () => {} },
});

export const useDealsContext = (): DealsContent => useContext(DealsContext);

export const DealsProvider = ({ children }: DealsProviderProps) => {
  const debounce = useDebounce(2500);
  const { isLoading, setIsLoading } = useLoadingState(true);

  const subscriptions = useSubscriptions<SubscribeKey>();

  const updateDeals = (parameters: Parameter[], deals: Deal[]) => {
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

  useMethodAfterMount(() => api.deals.getDeals(), {
    onStartLoading: setIsLoading.on,
    onEndLoading: setIsLoading.off,
    onError: () => subscriptions.ping('indicator:error', 100),
    next: ([p, d]) => {
      parameters.set(p, true);
      deals.set(d, true);
    },
  });

  return (
    <DealsContext.Provider
      value={{ subscriptions, deals, parameters }}
      children={isLoading ? null : children}
    />
  );
};

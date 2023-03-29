import { createContext, ReactNode, useContext, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useDebounce, useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { Deal, Parameter } from '~/types/deals';
import api from '~/api';

type SubscribeKey = 'table' | `id=${string};p=${string}:${string}`;

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
  const debounce = useDebounce(1000);
  const { isLoading, setIsLoading } = useLoadingState(true);

  const subscriptions = useSubscriptions<SubscribeKey>();

  const deals = useValue([] as Deal[], {
    onUpdate: (d) => {
      debounce.set(() => api.deals.updateDeals(parameters.get, d));
    },
  });
  const parameters = useValue([] as Parameter[], {
    onUpdate: (p) => {
      debounce.set(() => api.deals.updateDeals(p, deals.get));
    },
  });

  useMethodAfterMount(() => api.deals.getDeals(), {
    onStartLoading: setIsLoading.on,
    onEndLoading: setIsLoading.off,
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

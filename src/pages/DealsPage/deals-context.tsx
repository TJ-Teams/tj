import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useLoadingState, useMethodAfterMount } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { Deal, Parameter } from './types';

type SubscribeKey = 'table';

type DealsContent = {
  subscriptions: UseSubscriptions<SubscribeKey>;
  deals: ValueRef<Deal[]>;
  parameters: ValueRef<Parameter[]>;
};

type DealsProviderProps = {
  children: ReactNode;
};

const DealsContext = createContext<DealsContent>({
  subscriptions: { subscribe: () => () => {}, ping: () => {} },
  deals: { get: [], set: () => {} },
  parameters: { get: [], set: () => {} },
});

export const useDealsContext = (): DealsContent => useContext(DealsContext);

export const DealsProvider = ({ children }: DealsProviderProps) => {
  const { isLoading, setIsLoading } = useLoadingState(true);
  const subscriptions = useSubscriptions<SubscribeKey>();
  const deals = useValue([] as Deal[], {
    onUpdate: (v) => safelyLocalStorage.setJson(dealsKey, v),
  });
  const parameters = useValue([] as Parameter[], {
    onUpdate: (v) => safelyLocalStorage.setJson(parametersKey, v),
  });

  useEffect(() => {
    deals.set(safelyLocalStorage.getJsonOrElse(dealsKey, defaultDeals), true);
    parameters.set(
      safelyLocalStorage.getJsonOrElse(parametersKey, defaultParameters),
      true
    );
    setIsLoading.off();
  }, []);

  return (
    <DealsContext.Provider
      value={{ subscriptions, deals, parameters }}
      children={isLoading ? null : children}
    />
  );
};

const dealsKey = 'deals-page:deals';
const defaultDeals: Deal[] = [
  {
    name: 'INTC',
    startDate: new Date(),
    endDate: new Date(),
    strategy: 'Восходящий клин',
    mark: 'RSI',
    sector: 'Технологии',
    positionVolume: 200,
    market: 'Акции',
    income: 200,
    factor: 4,
    accuracy: 100,
  },
  {
    name: 'BTC',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    strategy: 'Молот',
    positionVolume: 300,
    market: 'Криптовалюта',
    income: -200,
    factor: -2,
    accuracy: 50,
  },
];

const parametersKey = 'deals-page:parameters';
const defaultParameters: Parameter[] = [
  { key: 'name', name: 'Наименование', type: 'string' },
  { key: 'startDate', name: 'Дата входа', type: 'date' },
  { key: 'endDate', name: 'Дата выхода', type: 'date' },
  { key: 'strategy', name: 'Стратегий', type: 'string' },
  { key: 'mark', name: 'Показатель', type: 'string' },
  { key: 'sector', name: 'Сектор', type: 'string' },
  { key: 'positionVolume', name: 'Объем позиции', type: 'number' },
  { key: 'market', name: 'Рынок', type: 'string' },
  { key: 'income', name: 'Доход', type: 'number' },
  { key: 'factor', name: 'Factor', type: 'number' },
  { key: 'accuracy', name: 'Точность', type: 'number' },
];

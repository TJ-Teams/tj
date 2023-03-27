import { useMemo, useRef } from 'react';

const useSubscriptions = <TKey = string>(): UseSubscriptions<TKey> => {
  const generateId = useRef(0);
  const subscriptions = useRef(new Map<TKey, Map<number, () => void>>());

  return useMemo(() => {
    const subscribe = (key: TKey, action: () => void) => {
      if (!subscriptions.current.has(key)) {
        subscriptions.current.set(key, new Map());
      }
      const subscribeId = generateId.current++;
      subscriptions.current.get(key)?.set(subscribeId, action);

      return () => {
        subscriptions.current.get(key)?.delete(subscribeId);
      };
    };

    const ping = (key: TKey) => {
      subscriptions.current.get(key)?.forEach((action) => action());
    };

    return {
      subscribe,
      ping,
    };
  }, []);
};

export type UseSubscriptions<TKey = string> = {
  subscribe: (key: TKey, action: () => void) => () => void;
  ping: (key: TKey) => void;
};

export default useSubscriptions;

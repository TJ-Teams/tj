import { useEffect, useMemo, useRef } from 'react';

const useSubscriptions = <TKey = string>(): UseSubscriptions<TKey> => {
  const generateId = useRef(0);
  const subscriptions = useRef(new Map<TKey, Map<number, () => void>>());

  return useMemo(() => {
    const useSubscribe = (key: TKey, action: () => void) =>
      useEffect(() => {
        if (!subscriptions.current.has(key)) {
          subscriptions.current.set(key, new Map());
        }
        const subscribeId = generateId.current++;
        subscriptions.current.get(key)?.set(subscribeId, action);

        return () => {
          subscriptions.current.get(key)?.delete(subscribeId);
        };
      }, []);

    const ping = (key: TKey, delay?: number) => {
      const execute = () =>
        subscriptions.current.get(key)?.forEach((action) => action());
      if (delay === undefined) {
        execute();
      } else {
        setTimeout(execute, delay);
      }
    };

    return {
      useSubscribe,
      ping,
    };
  }, []);
};

export type UseSubscriptions<TKey = string> = {
  useSubscribe: (key: TKey, action: () => void) => void;
  ping: (key: TKey, delay?: number) => void;
};

export default useSubscriptions;

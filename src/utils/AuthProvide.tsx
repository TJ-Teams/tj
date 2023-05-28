import { createContext, ReactNode, useContext } from 'react';
import { useValue } from '~/hooks';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import { ValueRef } from '~/hooks/useValue';
import safelyLocalStorage from './safely-local-storage';

type SubscriptionKey = 'change-auth';

type AuthContent = {
  isAuth: ValueRef<boolean>;
  subscriptions: UseSubscriptions<SubscriptionKey>;
};

const AuthContext = createContext<AuthContent>({
  isAuth: { get: false, set: () => {} },
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AUTH_STORAGE_KEY = 'auth.access-token';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const subscriptions = useSubscriptions<SubscriptionKey>();
  const isAuth = useValue(Boolean(safelyLocalStorage.get(AUTH_STORAGE_KEY)), {
    onUpdate: () => subscriptions.ping('change-auth'),
  });

  return (
    <AuthContext.Provider
      value={{ isAuth, subscriptions }}
      children={children}
    />
  );
};

export const useAuthContext = (): AuthContent => useContext(AuthContext);

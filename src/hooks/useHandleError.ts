import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { AUTH_STORAGE_KEY, useAuthContext } from '~/utils/AuthProvide';
import safelyLocalStorage from '~/utils/safely-local-storage';
import { errorToast, unknownErrorToast } from '~/utils/template-toasts';

const useHandleError = () => {
  const toast = useToast();
  const { isAuth } = useAuthContext();

  return useCallback((error: unknown) => {
    console.error(error);

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.msg;
      if (error.response?.status === 401) {
        isAuth.set(false);
        safelyLocalStorage.remove(AUTH_STORAGE_KEY);
      }
      if (errorMessage) {
        toast(errorToast(errorMessage));
        return;
      }
    }

    const e = error as Error | undefined;
    toast(e?.message ? errorToast(e?.message) : unknownErrorToast);
  }, []);
};

export default useHandleError;

import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { unknownErrorToast, errorToast } from '~/utils/template-toasts';

const useHandleError = () => {
  const toast = useToast();

  return useCallback((error: unknown) => {
    console.error(error);
    const e = error as Error | undefined;
    toast(e?.message ? errorToast(e?.message) : unknownErrorToast);
  }, []);
};

export default useHandleError;

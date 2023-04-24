import { useBoolean } from '@chakra-ui/react';
import useCancelOnUnmount from './useCancelOnUnmount';
import useHandleError from './useHandleError';

type Options = {
  isHiddenLoading?: boolean;
  onCatch?: (error: unknown) => void;
  onFinally?: () => void;
};

const useLoadingState = (defaultIsLoading = false) => {
  const cancelOnUnmount = useCancelOnUnmount();
  const [isLoading, setIsLoading] = useBoolean(defaultIsLoading);
  const handleError = useHandleError();

  const trackLoading =
    (method: () => Promise<void> | void, options?: Options) => async () => {
      try {
        !options?.isHiddenLoading && cancelOnUnmount(setIsLoading.on);
        await method();
      } catch (error) {
        options?.onCatch?.(error);
        handleError(error);
      } finally {
        options?.onFinally?.();
        !options?.isHiddenLoading && cancelOnUnmount(setIsLoading.off);
      }
    };

  return {
    isLoading,
    setIsLoading,
    trackLoading,
  };
};

export default useLoadingState;

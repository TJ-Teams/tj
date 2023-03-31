import { DependencyList, useEffect } from 'react';
import useHandleError from './useHandleError';

type Options<TResult, TError> = {
  deps?: DependencyList;
  next?: (result: TResult) => void;
  onStartLoading?: () => void;
  onEndLoading?: () => void;
  onError?: (error: TError) => void;
  isUseCancelAfterUnmount?: boolean;
  isSkip?: boolean;
};

const useMethodAfterMount = <TResult, TError>(
  method: () => Promise<TResult>,
  options: Options<TResult, TError> = {}
) => {
  const {
    deps = [],
    next,
    onStartLoading,
    onEndLoading,
    onError,
    isUseCancelAfterUnmount = true,
    isSkip,
  } = options;

  const handleError = useHandleError();

  useEffect(() => {
    let isCancel = false;
    const callMethod = async () => {
      if (!isSkip) {
        try {
          onStartLoading?.();
          const result = await method();
          !isCancel && next?.(result);
        } catch (err) {
          !isCancel && onError?.(err as TError);
          handleError(err)
        } finally {
          !isCancel && onEndLoading?.();
        }
      }
    };
    callMethod();
    return () => {
      isUseCancelAfterUnmount && (isCancel = true);
    };
  }, deps);
};

export default useMethodAfterMount;

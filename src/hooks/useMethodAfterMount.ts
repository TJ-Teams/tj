import { DependencyList, useEffect } from "react";

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

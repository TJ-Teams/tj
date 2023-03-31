import { useCallback, useEffect } from "react";
import useValue from "./useValue";

const useCancelOnUnmount = () => {
  const isCancel = useValue(false);

  useEffect(() => {
    isCancel.set(false);
    return () => {
      isCancel.set(true);
    };
  }, []);

  return useCallback((func: () => void) => {
    !isCancel.get && func();
  }, []);
};

export default useCancelOnUnmount;

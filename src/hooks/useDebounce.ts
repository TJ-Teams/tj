import { useCallback } from "react";
import useValue from "./useValue";

function useDebounce(debounceTime: number) {
  const timeout = useValue<number | undefined>(undefined);

  const reset = useCallback(() => {
    if (timeout.get) {
      clearTimeout(timeout.get);
      timeout.set(undefined);
    }
  }, []);

  const set = useCallback((callback: () => void) => {
    reset();
    timeout.set(setTimeout(callback, debounceTime));
  }, []);

  return {
    set,
    reset,
  };
}

export default useDebounce;

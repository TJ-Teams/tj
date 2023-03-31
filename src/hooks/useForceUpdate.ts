import { useCallback, useState } from "react";
import useCancelOnUnmount from "./useCancelOnUnmount";

const useForceUpdate = () => {
  const cancelOnUnmount = useCancelOnUnmount();
  const [_, setCount] = useState(0);

  return useCallback(() => {
    cancelOnUnmount(() => setCount((count) => count + 1));
  }, []);
};

export default useForceUpdate;

import { DependencyList, useEffect, useRef } from 'react';

type UseFieldFocusParams = {
  isActive: boolean;
  withSelect?: boolean;
  deps: DependencyList;
};

const useFieldFocus = <T extends HTMLInputElement>({
  isActive,
  withSelect,
  deps = [],
}: UseFieldFocusParams) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.focus();
      withSelect && ref.current?.select();
    }
  }, deps);

  return ref;
};

export default useFieldFocus;

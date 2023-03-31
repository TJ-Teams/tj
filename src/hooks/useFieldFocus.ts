import { DependencyList, useEffect, useRef } from 'react';

type UseFieldFocusParams = {
  isActive: boolean;
  needFocusAtFirstMount?: boolean;
  withSelect?: boolean;
  deps: DependencyList;
};

const useFieldFocus = <T extends HTMLInputElement>({
  isActive,
  needFocusAtFirstMount,
  withSelect,
  deps = [],
}: UseFieldFocusParams) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (needFocusAtFirstMount) {
      ref.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      ref.current?.focus();
      withSelect && ref.current?.select();
    }
  }, deps);

  return ref;
};

export default useFieldFocus;

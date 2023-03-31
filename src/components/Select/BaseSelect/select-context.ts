import { createContext, useContext } from "react";
import { SelectOption } from "../types";

// eslint-disable-next-line
type SelectContent<T = any> = {
  activeIndex: number;
  chosenKeys: Set<string>;
  onChange: (option: SelectOption<T>) => void;
};

export const SelectContext = createContext<SelectContent>({
  activeIndex: -1,
  chosenKeys: new Set<string>(),
  onChange: () => ({}),
});

export const useSelectContext = <T>(): SelectContent<T> =>
  useContext(SelectContext);

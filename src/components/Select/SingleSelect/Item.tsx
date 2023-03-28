import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import BaseSelect from "../BaseSelect";
import { SelectOption } from "../types";

type Props<T> = {
  option: SelectOption<T>;
};

const SingleItem = <T,>({ option }: Props<T>) => {
  const { chosenKeys, onChange } = BaseSelect.useContext();

  return useMemo(() => {
    return (
      <BaseSelect.DropdownItem
        isChosen={chosenKeys.has(option.key)}
        onClick={() => onChange(option)}
        children={
          <Text
            noOfLines={1}
            w="full"
            fontSize="small"
            wordBreak="break-all"
            children={option.label}
          />
        }
      />
    );
  }, [option.key, chosenKeys.has(option.key)]);
};

export default SingleItem;

import { RefObject, useRef, useState } from "react";

type useSelectLogicParams = {
  inputRef: RefObject<HTMLInputElement>;
  dropdownRef: RefObject<HTMLDivElement>;
  optionsLength: number;
  optionsHeightInDropdown: number;
  optionsNumberInDropdown: number;
};

const useSelectLogic = ({
  inputRef,
  dropdownRef,
  optionsLength,
  optionsHeightInDropdown,
  optionsNumberInDropdown,
}: useSelectLogicParams) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const bottomBorder = useRef(optionsNumberInDropdown - 1);
  const topBorder = useRef(0);

  const onKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    actions?: {
      onEsc?: () => void;
      onEnter?: (activeIndex: number) => void;
      onArrowDown?: boolean;
      onArrowUp?: boolean;
    }
  ) => {
    if (!inputRef.current) return;

    if (actions?.onEsc && e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.focus();
      actions.onEsc();
    }

    if (actions?.onEnter && e.key === "Enter") {
      e.preventDefault();
      actions.onEnter(activeIndex);
    }

    if (!dropdownRef.current) return;

    if (actions?.onArrowDown && e.key === "ArrowDown") {
      e.preventDefault();
      if (activeIndex + 1 > optionsLength - 1) {
        dropdownRef.current.scroll({ top: 0 });
        topBorder.current = 0;
        bottomBorder.current = optionsNumberInDropdown - 1;
        setActiveIndex(0);
      } else {
        if (bottomBorder.current === activeIndex) {
          const childIndex = activeIndex - (optionsNumberInDropdown - 1) + 1;
          dropdownRef.current.scroll({
            top: (dropdownRef.current.children[childIndex] as HTMLDivElement)
              ?.offsetTop,
          });
          bottomBorder.current = activeIndex + 1;
          topBorder.current = topBorder.current + 1;
        }
        setActiveIndex(activeIndex + 1);
      }
    }

    if (actions?.onArrowUp && e.key === "ArrowUp") {
      e.preventDefault();
      if (activeIndex - 1 < 0) {
        dropdownRef.current.scroll({
          top: (
            dropdownRef.current.children[optionsLength - 1] as HTMLDivElement
          )?.offsetTop,
        });
        topBorder.current = optionsLength - 1 - (optionsNumberInDropdown - 1);
        bottomBorder.current = optionsLength - 1;

        setActiveIndex(optionsLength - 1);
      } else {
        if (topBorder.current === activeIndex) {
          const childIndex = activeIndex - 1;
          dropdownRef.current.scroll({
            top: (dropdownRef.current.children[childIndex] as HTMLDivElement)
              ?.offsetTop,
          });
          topBorder.current = activeIndex - 1;
          bottomBorder.current = bottomBorder.current - 1;
        }
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  const scrollToOption = (optionIndex: number | undefined) => {
    if (!dropdownRef.current) return;

    if (optionIndex) {
      dropdownRef.current.scroll({
        top:
          (dropdownRef.current.children[optionIndex] as HTMLDivElement)
            ?.offsetTop -
          (Math.round(optionsNumberInDropdown / 2) - 1) *
            optionsHeightInDropdown,
      });

      const topBorderValue =
        optionIndex - (Math.round(optionsNumberInDropdown / 2) - 1);
      const bottomBorderValue =
        optionIndex +
        Math.round(optionsNumberInDropdown / 2) -
        (optionsNumberInDropdown % 2 === 0 ? 0 : 1);

      topBorder.current =
        topBorderValue < 0
          ? 0
          : bottomBorderValue > optionsLength - 1
          ? topBorderValue - (bottomBorderValue - (optionsLength - 1))
          : topBorderValue;
      bottomBorder.current =
        bottomBorderValue > optionsLength - 1
          ? optionsLength - 1
          : topBorderValue < 0
          ? bottomBorderValue + -topBorderValue
          : bottomBorderValue;

      setActiveIndex(optionIndex);
    } else {
      topBorder.current = 0;
      bottomBorder.current = optionsNumberInDropdown - 1;
      dropdownRef.current.scroll({ top: 0 });
      setActiveIndex(-1);
    }
  };

  return { activeIndex, onKey, scrollToOption };
};

export default useSelectLogic;

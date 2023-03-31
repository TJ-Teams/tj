import { Box, BoxProps, useBoolean, useMergeRefs } from '@chakra-ui/react';
import React, {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputProps } from '~/components/Input';
import Popper from '~/components/Popper';
import { useOutsideAction } from '~/hooks';
import BaseSelect from '../BaseSelect';
import { SelectOption } from '../types';
import SingleItem from './Item';
import SingleSelectInput from './SingleSelectInput';

type Props<T> = {
  options: SelectOption<T>[];
  onChange?: (option?: SelectOption<T>) => void;
  defaultOptionKey?: string;
  optionsHeightInDropdown?: number;
  optionsNumberInDropdown?: number;
  label: string;
  inputProps?: Omit<InputProps, 'label'>;
  allowInput?: boolean;
  isLoading?: boolean;
} & Omit<BoxProps, 'onChange'>;

const SingleSelect = <T,>(
  {
    options = [],
    onChange,
    defaultOptionKey,
    optionsHeightInDropdown = 36,
    optionsNumberInDropdown = 5,
    label,
    inputProps,
    allowInput,
    isLoading,
    ...props
  }: Props<T>,
  ref: Ref<HTMLInputElement>
) => {
  const optionsMemoKey = JSON.stringify(options);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useMergeRefs(inputRef, ref);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useBoolean(false);
  const [chosenOption, setChosenOption] = useState<SelectOption<T>>();
  const [filteredOptions, setFilteredOptions] = useState(options);

  const { activeIndex, scrollToOption, onKey } = BaseSelect.useLogic({
    inputRef,
    dropdownRef,
    optionsHeightInDropdown,
    optionsNumberInDropdown,
    optionsLength: filteredOptions.length,
  });

  const handleClose = () => {
    if (!inputRef.current) return;

    if (chosenOption && inputRef.current.value.trim() === '') {
      setChosenOption(undefined);
      onChange?.(undefined);
    } else if (chosenOption) {
      inputRef.current.value = chosenOption.label;
    }

    setIsOpen.off();
    allowInput && setFilteredOptions(options);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKey(e, {
      onEsc: handleClose,
      onEnter: (activeIndex) => {
        if (!isOpen) {
          setIsOpen.on();
          return;
        }

        if (activeIndex > -1 && filteredOptions[activeIndex]) {
          handleOptionChange(filteredOptions[activeIndex]);
        }
      },
      onArrowUp: true,
      onArrowDown: true,
    });
  };

  const handleOptionChange = (option: SelectOption<T>) => {
    if (!inputRef.current) return;

    inputRef.current.value = option.label;
    setChosenOption(option);
    onChange?.(option);

    setIsOpen.off();
    allowInput && setFilteredOptions(options);
  };

  const handleValueChange = (value: string) => {
    const normalizedValue = value.trim().toLowerCase();

    setIsOpen.on();
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(normalizedValue)
      )
    );
  };

  const handleClear = () => {
    inputRef.current && (inputRef.current.value = '');
    setChosenOption(undefined);
    onChange?.(undefined);
  };

  useOutsideAction({
    boxRef: boxRef,
    portalRef: dropdownRef,
    callBackOnExit: handleClose,
    isActive: isOpen,
  });

  useEffect(() => {
    if (!defaultOptionKey || !inputRef.current) return;

    const defaultOptionIndex = options.findIndex(
      (option) => option.key === defaultOptionKey
    );
    if (defaultOptionIndex < 0) return;

    inputRef.current.value = options[defaultOptionIndex].label;
    setChosenOption(options[defaultOptionIndex]);
  }, [defaultOptionKey, optionsMemoKey]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [optionsMemoKey]);

  useEffect(() => {
    scrollToOption(undefined);
  }, [filteredOptions]);

  useEffect(() => {
    if (!isOpen || !chosenOption) return;

    const index = options.findIndex((o) => o.key === chosenOption.key);
    scrollToOption(index > -1 ? index : undefined);
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({
      activeIndex,
      chosenKeys: chosenOption
        ? new Set([chosenOption.key])
        : new Set<string>(),
      onChange: handleOptionChange,
    }),
    [activeIndex, chosenOption?.key, optionsMemoKey]
  );

  return (
    <BaseSelect.Context.Provider value={contextValue}>
      <Box {...props} ref={boxRef} pos="relative">
        <SingleSelectInput
          {...inputProps}
          ref={inputRefs}
          label={label}
          allowInput={allowInput}
          isDropdownOpen={isOpen}
          isLoading={isLoading}
          isShowClear={!inputProps?.isDisabled && Boolean(chosenOption)}
          hasExternalValue={Boolean(chosenOption)}
          onClear={handleClear}
          {...(!isLoading && {
            onValueChange: allowInput ? handleValueChange : undefined,
            onKeyDown: handleKeyDown,
            onClick: setIsOpen.on,
          })}
          {...(!allowInput && {
            isReadOnly: true,
            value: chosenOption?.label || '',
            css: { caretColor: 'transparent' },
            _selection: { bg: 'transparent' },
          })}
        />

        <Popper isSameWidth isOpen={isOpen} anchorRef={inputRef}>
          <BaseSelect.Dropdown
            ref={dropdownRef}
            options={filteredOptions}
            optionsHeightInDropdown={optionsHeightInDropdown}
            maxH={`${optionsNumberInDropdown * optionsHeightInDropdown + 2}px`}
            renderItem={(option) => <SingleItem option={option} />}
          />
        </Popper>
      </Box>
    </BaseSelect.Context.Provider>
  );
};

export default forwardRef(SingleSelect) as <T>(
  props: Props<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement;

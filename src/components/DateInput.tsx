import { Box, ChakraProps, Input, InputProps } from '@chakra-ui/react';
import { FormEvent, memo, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export type DateInputProps = {
  defaultDate?: Date;
  minDate?: Date;
  onSave?: (date?: Date) => void;
} & InputProps;

const DateInput = ({
  defaultDate,
  minDate,
  onSave,
  ...inputProps
}: DateInputProps) => {
  const [date, setData] = useState(defaultDate);

  useEffect(() => {
    if (minDate && date && minDate > date) {
      onSave?.(minDate);
      setData(minDate);
    }
  }, [minDate?.toISOString()]);

  const handleChange = (date: Date | undefined | null) => {
    onSave?.(date || undefined);
    setData(date || undefined);
  };

  return (
    <Box sx={datePickerStyle}>
      <DatePicker
        minDate={minDate}
        preventOpenOnFocus
        todayButton="Сегодня"
        dateFormat="dd.MM.yyyy"
        selected={date}
        onSelect={handleChange}
        onChange={handleChange}
        disabledKeyboardNavigation
        placeholderText="ДД.ММ.ГГГГ"
        customInput={
          <Input
            p={0}
            h="fit-content"
            variant="unstyled"
            bg="transparent"
            fontSize="inherit"
            textAlign="center"
            onInput={maskDate}
            borderRadius={0}
            _placeholder={{ color: 'neutral.3', fontSize: '14px' }}
            {...inputProps}
          />
        }
      />
    </Box>
  );
};

const maskDate = (e: FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value.replace(/\D/g, '').slice(0, 8);
  // @ts-ignore в дефолтном типе отсутствует поле
  const offset = e.nativeEvent.inputType === 'insertText' ? 1 : 0;
  if (value.length >= 5 - offset) {
    value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
  } else if (value.length >= 3 - offset) {
    value = `${value.slice(0, 2)}.${value.slice(2)}`;
  }
  e.currentTarget.value = value;
};

const datePickerStyle: ChakraProps['sx'] = {
  '.react-datepicker__navigation--previous': { outline: 'none' },
  '.react-datepicker__navigation-icon--previous::before': {
    top: '10px',
  },
  '.react-datepicker__navigation--next': { outline: 'none' },
  '.react-datepicker__navigation-icon--next::before': {
    top: '10px',
  },
  '.react-datepicker__header': { bg: '#f3e4ff' },
  '.react-datepicker__today-button': { bg: '#f3e4ff' },
  '.react-datepicker__day--selected': {
    bg: '#f3e4ff',
    color: 'black',
    outline: 'none',
  },
  '.react-datepicker__day--keyboard-selected': {
    bg: 'transparent',
    outline: 'none',
    boxShadow: 'outline',
  },
  '.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after':
    { borderBottomColor: '#f3e4ff' },
};

export default memo(DateInput, (prev, next) => {
  return prev.minDate?.toISOString() === next.minDate?.toISOString();
});

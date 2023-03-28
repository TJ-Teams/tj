import {
  Box,
  Center,
  ChakraProps,
  FlexProps,
  Input,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useOutsideAction } from '~/hooks';
import { useDealsContext } from '../deals-context';
import { CellProps } from './Cell';

type Props = FlexProps & Pick<CellProps, 'cellKey' | 'getValue' | 'onUpdate'>;

const DateCell = ({ cellKey, getValue, onUpdate, ...props }: Props) => {
  const { subscriptions } = useDealsContext();
  const [isEditor, setIsEditor] = useBoolean(false);

  subscriptions.useSubscribe(`${cellKey}:focus`, setIsEditor.on);

  const boxRef = useRef<HTMLDivElement>(null);

  useOutsideAction({
    boxRef,
    isActive: isEditor,
    callBackOnExit: setIsEditor.off,
    triggerKeys: ['Enter'],
  });

  const value = getValue();
  const dateValue = value ? dayjs(value) : undefined;
  const normalizedValue = dateValue?.isValid()
    ? dateValue.format('DD.MM.YYYY')
    : '—';

  return (
    <Center
      ref={boxRef}
      cursor={isEditor ? 'text' : 'pointer'}
      onClick={setIsEditor.on}
      onKeyDown={(e) => e.key === 'Enter' && setIsEditor.on()}
      {...props}
    >
      {isEditor && boxRef.current ? (
        <DateInput
          defaultDate={dateValue?.toDate()}
          width={boxRef.current.getBoundingClientRect().width - 33}
          onSave={onUpdate}
        />
      ) : (
        <Text noOfLines={1} children={normalizedValue} />
      )}
    </Center>
  );
};

type DateInputProps = {
  width: number;
  defaultDate?: Date;
  onSave?: (date?: Date) => void;
};

const DateInput = ({ width, defaultDate, onSave }: DateInputProps) => {
  const [date, setData] = useState(defaultDate);

  useEffect(() => {
    document.querySelector<HTMLInputElement>('.calendar-input')?.select();
  }, []);

  useEffect(() => {
    onSave?.(date);
  }, [date?.toISOString()]);

  return (
    <Box sx={datePickerStyle}>
      <DatePicker
        startOpen
        preventOpenOnFocus
        todayButton="Сегодня"
        dateFormat="dd.MM.yyyy"
        selected={date}
        onSelect={setData}
        onChange={(date) => setData?.(date || undefined)}
        disabledKeyboardNavigation
        customInput={
          <Input
            p={0}
            className="calendar-input"
            ref={console.log}
            h="fit-content"
            w={width}
            variant="unstyled"
            bg="transparent"
            fontSize="inherit"
            textAlign="center"
            borderRadius={0}
          />
        }
      />
    </Box>
  );
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

export default DateCell;

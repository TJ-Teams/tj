import { Center, FlexProps, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { TypeCell } from './types';

type CellProps = {
  value: string | number | Date | undefined;
  type: TypeCell;
};

const Cell = ({ type, value }: CellProps) => {
  const TypedCell = getTypedCell(type);

  return (
    <TypedCell
      px={4}
      h="55px"
      maxH="55px"
      fontSize="14px"
      borderRight="1px solid #B9B9B9"
      borderBottom="1px solid #B9B9B9"
      value={value}
    />
  );
};

const getTypedCell = (type: TypeCell) => {
  switch (type) {
    case 'number':
      return NumberCell;
    case 'date':
      return DateCell;
    default:
      return StringCell;
  }
};

const StringCell = ({
  value,
  ...props
}: FlexProps & Omit<CellProps, 'type'>) => {
  const normalizedValue = value?.toString() || '—';

  return (
    <Center {...props}>
      <Text noOfLines={2} children={normalizedValue} />
    </Center>
  );
};

const NumberCell = ({
  value,
  ...props
}: FlexProps & Omit<CellProps, 'type'>) => {
  const numberValue = parseFloat((value || '').toString());
  const normalizedValue = !isNaN(numberValue)
    ? numberValue.toLocaleString()
    : '—';

  return (
    <Center justifyContent="flex-end" {...props}>
      <Text noOfLines={1} children={normalizedValue} />
    </Center>
  );
};

const DateCell = ({ value, ...props }: FlexProps & Omit<CellProps, 'type'>) => {
  const dateValue = value ? dayjs(value) : undefined;

  const normalizedValue = dateValue?.isValid()
    ? dateValue.format('DD.MM.YYYY')
    : '—';

  return (
    <Center {...props}>
      <Text noOfLines={1} children={normalizedValue} />
    </Center>
  );
};

export default Cell;

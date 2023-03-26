import { Center, FlexProps, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { TypeCell } from './types';

type CellProps = {
  isSecondary?: boolean;
  value: string | number | Date | undefined;
  type: TypeCell;
};

const Cell = ({ isSecondary, value, type }: CellProps) => {
  const TypedCell = getTypedCell(type);

  return (
    <TypedCell
      px={4}
      minW="max-content"
      h="55px"
      maxH="55px"
      fontSize="14px"
      bg={isSecondary ? '#f7f7f7' : 'white'}
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
}: FlexProps & Pick<CellProps, 'value'>) => {
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
}: FlexProps & Pick<CellProps, 'value'>) => {
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

const DateCell = ({
  value,
  ...props
}: FlexProps & Pick<CellProps, 'value'>) => {
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

import { Deal, TypeParameter } from '../types';
import DateCell from './DateCell';
import NumberCell from './NumberCell';
import StringCell from './StringCell';

export type CellProps = {
  isSecondary?: boolean;
  type: TypeParameter;
  getValue: () => Deal['type'];
  onUpdate?: (value: Deal['type']) => void;
};

const Cell = ({ isSecondary, getValue, type, onUpdate }: CellProps) => {
  const TypedCell = getTypedCell(type);

  return (
    <TypedCell
      px={4}
      minW="max-content"
      h="55px"
      maxH="55px"
      fontSize="14px"
      bg={isSecondary ? '#f7f7f7' : 'white'}
      getValue={getValue}
      onUpdate={onUpdate}
    />
  );
};

const getTypedCell = (type: TypeParameter) => {
  switch (type) {
    case 'number':
      return NumberCell;
    case 'date':
      return DateCell;
    default:
      return StringCell;
  }
};

export default Cell;

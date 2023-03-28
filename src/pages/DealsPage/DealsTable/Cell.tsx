import { FlexProps } from '@chakra-ui/react';
import { useForceUpdate } from '~/hooks';
import { useDealsContext } from '../deals-context';
import { Deal, TypeParameter } from '../types';
import DateCell from './DateCell';
import NumberCell from './NumberCell';
import StringCell from './StringCell';

export type CellProps = {
  cellKey: `id=${string};p=${string}`;
  isSecondary?: boolean;
  type: TypeParameter;
  getValue: () => Deal['type'];
  onUpdate?: (value: Deal['type']) => void;
} & FlexProps;

const Cell = ({
  cellKey,
  isSecondary,
  getValue,
  type,
  onUpdate,
  ...props
}: CellProps) => {
  const TypedCell = getTypedCell(type);

  return (
    <TypedCell
      px={4}
      fontSize="14px"
      cellKey={cellKey}
      bg={isSecondary ? '#f7f7f7' : 'white'}
      tabIndex={0}
      _focusVisible={{
        outline: 'none',
        boxShadow: 'inset 0 0 0 3px rgba(66, 153, 225, 0.6)',
      }}
      getValue={getValue}
      onUpdate={onUpdate}
      {...props}
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

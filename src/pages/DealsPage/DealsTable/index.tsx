import { Flex } from '@chakra-ui/react';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import { Column, Row } from './types';

const columns: Column[] = [
  { key: 'name', name: 'Наименование', type: 'string' },
  { key: 'startDate', name: 'Дата входа', type: 'date' },
  { key: 'endDate', name: 'Дата выхода', type: 'date' },
  { key: 'strategy', name: 'Стратегий', type: 'string' },
  { key: 'mark', name: 'Показатель', type: 'string' },
  { key: 'sector', name: 'Сектор', type: 'string' },
  { key: 'positionVolume', name: 'Объем позиции', type: 'number' },
  { key: 'market', name: 'Рынок', type: 'string' },
  { key: 'income', name: 'Доход', type: 'number' },
  { key: 'factor', name: 'Factor', type: 'number' },
  { key: 'accuracy', name: 'Точность', type: 'number' },
];

const rows: Row[] = [
  {
    name: 'INTC',
    startDate: new Date(),
    endDate: new Date(),
    strategy: 'Восходящий клин',
    mark: 'RSI',
    sector: 'Технологии',
    positionVolume: 200,
    market: 'Акции',
    income: 200,
    factor: 4,
    accuracy: 100,
  },
  {
    name: 'BTC',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    strategy: 'Молот',
    positionVolume: 300,
    market: 'Криптовалюта',
    income: -200,
    factor: -2,
    accuracy: 50,
  },
];

const DealsTable = () => (
  <Flex
    flexDir="column"
    overflow="auto"
    border="1px solid #b9b9b9"
    borderTop="none"
  >
    <Flex flex={1} flexDir="row">
      {columns.map((column) => (
        <Flex flexDir="column" _notLast={{ borderRight: '1px solid #b9b9b9' }}>
          <HeaderCell name={column.name} />
          {rows.map((row, j) => (
            <Cell
              key={j}
              isSecondary={j % 2 === 1}
              value={row[column.key]}
              type={column.type}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  </Flex>
);

export default DealsTable;

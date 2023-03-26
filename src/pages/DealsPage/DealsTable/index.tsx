import { Button, Flex, Text } from '@chakra-ui/react';
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

const rows: Row[] = [...Array(10)].flatMap(
  () =>
    [
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
    ] as Row[]
);

const DealsTable = () => {
  return (
    <Flex
      w="fit-content"
      h="fit-content"
      m={4}
      flexDir="column"
      border="1px solid #B9B9B9"
    >
      <Flex flexDir="row">
        {columns.map((column) => (
          <Flex key={column.key} flexDir="column" w="max-content">
            <HeaderCell name={column.name} />
            {rows.map((row, i) => (
              <Cell key={i} value={row[column.key]} type={column.type} />
            ))}
          </Flex>
        ))}
        <Text
          pt={5}
          pos="sticky"
          top="74px"
          right={0}
          bg="pink"
          css={{ writingMode: 'vertical-lr' }}
          children=" + "
        />
      </Flex>
      <Text
        w="full"
        pos="sticky"
        bottom={0}
        left={0}
        bg="red"
        textAlign="center"
        children="Добавить сделку"
      />
    </Flex>
  );
};

export default DealsTable;

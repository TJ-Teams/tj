import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForceUpdate } from '~/hooks';
import { useDealsContext } from '../deals-context';
import { Deal } from '../types';
import Cell from './Cell';
import HeaderCell from './HeaderCell';

const DealsTable = () => {
  const forceUpdate = useForceUpdate();
  const { deals, parameters, subscriptions } = useDealsContext();

  useEffect(() => {
    return subscriptions.subscribe('table', forceUpdate);
  }, []);

  const getCellValue = (index: number, key: string) => {
    return () => deals.get[index][key];
  };

  const updateCell = (index: number, key: string) => {
    return (value: Deal['type']) => {
      const newDeals = [...deals.get];
      const object = { ...newDeals[index], [key]: value };
      newDeals[index] = object;
      deals.set(newDeals);
    };
  };

  return (
    <Flex
      flexDir="column"
      overflow="auto"
      border="1px solid #b9b9b9"
      borderTop="none"
    >
      <Flex flex={1} flexDir="row">
        {parameters.get.map((p) => (
          <Flex
            key={p.key}
            flexDir="column"
            _notLast={{ borderRight: '1px solid #b9b9b9' }}
          >
            <HeaderCell name={p.name} />
            {deals.get.map((_, j) => (
              <Cell
                key={j}
                isSecondary={j % 2 === 1}
                type={p.type}
                getValue={getCellValue(j, p.key)}
                onUpdate={updateCell(j, p.key)}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DealsTable;

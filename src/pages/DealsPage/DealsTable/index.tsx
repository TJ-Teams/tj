import { ChakraProps, Flex, Grid } from '@chakra-ui/react';
import { useForceUpdate } from '~/hooks';
import { Deal } from '~/types/deals';
import { useDealsContext } from '../deals-context';
import Cell from './Cell';
import HeaderCell from './HeaderCell';

const DealsTable = () => {
  const forceUpdate = useForceUpdate();
  const { deals, parameters, subscriptions } = useDealsContext();

  subscriptions.useSubscribe('table', forceUpdate);

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
      minW="700px"
      flexDir="column"
      overflow="auto"
      border="1px solid #b9b9b9"
      borderTop="none"
      css={scrollBarStyle}
      scrollBehavior="smooth"
    >
      <Grid
        flex={1}
        gridAutoRows="55px"
        gridTemplateColumns={`repeat(${parameters.get.length}, max-content)`}
      >
        {parameters.get.map((p, i) => (
          <HeaderCell
            key={`header-${p.key}`}
            name={p.name}
            borderLeft={i !== 0 ? '1px solid #b9b9b9' : 'none'}
          />
        ))}
        {deals.get.map((d, i) =>
          parameters.get.map((p, j) => (
            <Cell
              key={`row-${d.id}-${p.key}`}
              cellKey={`id=${d.id};p=${p.key}`}
              isSecondary={i % 2 === 1}
              borderLeft={j !== 0 ? '1px solid #b9b9b9' : 'none'}
              type={p.type}
              getValue={getCellValue(i, p.key)}
              onUpdate={updateCell(i, p.key)}
            />
          ))
        )}
      </Grid>
    </Flex>
  );
};

const scrollBarStyle: ChakraProps['css'] = {
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar:vertical': {
    borderLeft: '1px solid #b9b9b9',
  },
  '&::-webkit-scrollbar:horizontal': {
    borderTop: '1px solid #b9b9b9',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#f3e4ff',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    borderLeft: '1px solid #b9b9b9',
  },
  '&::-webkit-scrollbar-thumb:horizontal': {
    borderTop: '1px solid #b9b9b9',
  },
};

export default DealsTable;

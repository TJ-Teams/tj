import { Box, ChakraProps } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';
import * as rdg from 'react-datasheet-grid';
import { v4 as uuidV4 } from 'uuid';
import { Deal, Parameter, ProviderType, TypeParameter } from '~/types/deals';
import BottomBar from './BottomBar';
import { useDealsContext } from './deals-context';
import TableContextMenu from './TableContextMenu';

const DealsTable = () => {
  const key = useRef(uuidV4());
  const { deals, parameters, subscriptions } = useDealsContext();

  const columns = useMemo(() => {
    return parameters.get.map<rdg.Column<Deal>>((p) => ({
      // @ts-ignore
      ...rdg.keyColumn(p.key, getColumnByType(p.type)),
      title: p.name,
      minWidth: 15 * Math.max(12, p.name.length),
    }));
  }, [JSON.stringify(parameters.get)]);

  const [data, setData] = useState(() =>
    normalizeDeals(deals.get, parameters.get)
  );

  const handleDealsChange = useCallback((newDeals: Deal[]) => {
    deals.set(
      newDeals.map((deal) => {
        const fixedDeals = Object.fromEntries(
          parameters.get
            .filter((p) => p.type === 'date')
            .map((p) => {
              const date = dayjs.utc(deal[p.key]);
              const normalizedDate =
                deal[p.key] && date.isValid()
                  ? date.format('YYYY-MM-DD')
                  : undefined;
              return [p.key, normalizedDate];
            })
        );
        return { ...deal, ...fixedDeals };
      })
    );
    setData(newDeals);
  }, []);

  // при удаление последнего столбца, компонент крашится
  // поэтому приходится делать фулл ререндер
  subscriptions.useSubscribe('table-key', () => {
    key.current = uuidV4();
  });

  subscriptions.useSubscribe('table', () => {
    setData(normalizeDeals(deals.get, parameters.get));
  });

  return (
    <Box overflow="hidden" sx={dataSheetGridStyles}>
      <rdg.DynamicDataSheetGrid
        key={key.current}
        rowKey="id"
        columns={columns}
        value={data}
        onChange={handleDealsChange}
        createRow={createRow}
        duplicateRow={duplicateRow}
        addRowsComponent={BottomBar}
        contextMenuComponent={TableContextMenu}
      />
    </Box>
  );
};

const normalizeDeals = (deals: Deal[], parameters: Parameter[]) => {
  const columnWithDate = parameters.filter((p) => p.type === 'date');
  return deals.map((deal) => {
    const fixedDeals = Object.fromEntries(
      columnWithDate.map((p) => {
        const date = dayjs.utc(deal[p.key], 'YYYY-MM-DD');
        const normalizedDate =
          deal[p.key] && date.isValid() ? date.toDate() : undefined;
        return [p.key, normalizedDate];
      })
    );
    return { ...deal, ...fixedDeals };
  });
};

const getColumnByType = (type: TypeParameter) => {
  switch (type) {
    case 'date':
      return rdg.dateColumn;
    case 'number':
      return rdg.floatColumn;
    default:
      return rdg.textColumn;
  }
};

const createRow = () => ({
  id: uuidV4(),
  'provider-type': ProviderType.TradersJournal,
});

const duplicateRow = (opts: { rowData: Deal; rowIndex: number }): Deal => ({
  ...opts.rowData,
  id: uuidV4(),
});

const dataSheetGridStyles: ChakraProps['sx'] = {
  '.dsg-container': {
    minWidth: 'calc(100vw - 49px)',
    minHeight: 'calc(100vh - 130px)',
    border: 'none',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      width: '15px',
      height: '15px',
    },
    '&::-webkit-scrollbar:vertical': {
      borderLeft: '1px solid #e5e5e5',
    },
    '&::-webkit-scrollbar:horizontal': {
      borderTop: '1px solid #e5e5e5',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#f3e4ff',
      border: '0.5px solid #cf92ff',
      borderRadius: 4,
    },
  },
  '.dsg-cell-header': {
    bg: '#f3e4ff',
  },
  '.dsg-cell-header, .dsg-cell-gutter': {
    color: 'black',
    justifyContent: 'center',
  },
  '.dsg-cell-header-active, .dsg-cell-gutter-active': {
    fontWeight: 'bold',
  },
  '.dsg-scrollable-view-container': {
    minHeight: 'calc(100vh - 145px)',
  },
};

export default DealsTable;

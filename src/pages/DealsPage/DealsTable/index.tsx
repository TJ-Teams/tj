import { Box, ChakraProps } from '@chakra-ui/react';
import { Deal, Parameter, TypeParameter } from '~/types/deals';
import { useDealsContext } from '../deals-context';

import {
  Column,
  ContextMenuItem,
  createContextMenuComponent,
  dateColumn,
  DynamicDataSheetGrid,
  floatColumn,
  keyColumn,
  textColumn,
} from 'react-datasheet-grid';

import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import BottomBar from '../BottomBar';
import dayjs from 'dayjs';

const DealsTable = () => {
  const { deals, parameters, subscriptions } = useDealsContext();

  const columns = useMemo(() => {
    return parameters.get.map<Column<Deal>>((p) => ({
      // @ts-ignore
      ...keyColumn(p.key, getColumnByType(p.type)),
      title: p.name,
      minWidth: 15 * Math.max(12, p.name.length),
    }));
  }, [parameters.get.length]);

  const [data, setData] = useState(() =>
    normalizeDeals(deals.get, parameters.get)
  );

  const handleDealsChange = useCallback((newDeals: Deal[]) => {
    deals.set(newDeals);
    setData(newDeals);
  }, []);

  subscriptions.useSubscribe('table', () => {
    setData(normalizeDeals(deals.get, parameters.get));
  });

  return (
    <Box overflow="hidden" sx={dataSheetGridStyles}>
      <DynamicDataSheetGrid
        rowKey="id"
        columns={columns}
        value={data}
        onChange={handleDealsChange}
        createRow={createRow}
        duplicateRow={duplicateRow}
        addRowsComponent={BottomBar}
        contextMenuComponent={ContextMenu}
      />
    </Box>
  );
};

const normalizeDeals = (deals: Deal[], parameters: Parameter[]) => {
  const columnWithDate = parameters.filter((p) => p.type === 'date');
  return deals.map((deal) => {
    const fixedDeals = Object.fromEntries(
      columnWithDate.map((p) => {
        const date = dayjs(deal[p.key]);
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
      return dateColumn;
    case 'number':
      return floatColumn;
    default:
      return textColumn;
  }
};

const createRow = () => ({ id: uuidV4() });

const duplicateRow = (opts: { rowData: Deal; rowIndex: number }): Deal => ({
  ...opts.rowData,
  id: uuidV4(),
});

const ContextMenu = createContextMenuComponent((item: ContextMenuItem) => {
  switch (item.type) {
    case 'COPY':
      return <>Копировать</>;
    case 'CUT':
      return <>Вырезать</>;
    case 'PASTE':
      return <>Вставить</>;
    case 'DELETE_ROW':
      return <>Удалить строчку</>;
    case 'DELETE_ROWS':
      return (
        <>
          Удалить строчки с <b>{item.fromRow}</b> по <b>{item.toRow}</b>
        </>
      );
    case 'DUPLICATE_ROW':
      return <>Дублировать строчку</>;
    case 'DUPLICATE_ROWS':
      return (
        <>
          Дублировать строчки с <b>{item.fromRow}</b> по <b>{item.toRow}</b>
        </>
      );
    case 'INSERT_ROW_BELLOW':
      return <>Создать строчку снизу</>;
    default:
      return item;
  }
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

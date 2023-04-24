import { Box, ChakraProps } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as rdg from 'react-datasheet-grid';
import { v4 as uuidV4 } from 'uuid';
import { Deal, Parameter, TypeParameter } from '~/types/deals';
import BottomBar from './BottomBar';
import { useDealsContext } from './deals-context';

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
  }, [parameters.get.length]);

  const [data, setData] = useState(() =>
    normalizeDeals(deals.get, parameters.get)
  );

  const handleDealsChange = useCallback((newDeals: Deal[]) => {
    deals.set(newDeals);
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
      return rdg.dateColumn;
    case 'number':
      return rdg.floatColumn;
    default:
      return rdg.textColumn;
  }
};

const createRow = () => ({ id: uuidV4() });

const duplicateRow = (opts: { rowData: Deal; rowIndex: number }): Deal => ({
  ...opts.rowData,
  id: uuidV4(),
});

const createContextMenuComponent =
  (renderItem: (item: rdg.ContextMenuItem) => JSX.Element) =>
  ({
    clientX,
    clientY,
    items,
    close,
    cursorIndex,
  }: rdg.ContextMenuComponentProps) => {
    const { deals, parameters, subscriptions } = useDealsContext();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const onClickOutside = (event: MouseEvent) => {
        const clickInside = containerRef.current?.contains(
          event.target as Node
        );
        if (!clickInside) close();
      };

      document.addEventListener('mousedown', onClickOutside);

      return () => {
        document.removeEventListener('mousedown', onClickOutside);
      };
    }, [close]);

    const removeColumn = () => {
      const parameter = parameters.get.at(cursorIndex?.col);
      close();
      if (!parameter) return;

      const isLastColumn = cursorIndex?.col === parameters.get.length - 1;

      const newDeals = deals.get.map((d) => {
        return Object.fromEntries(
          Object.entries(d).filter(([key, _]) => key !== parameter.key)
        ) as Deal;
      });
      const newParameters = parameters.get.filter(
        (_, i) => i !== cursorIndex?.col
      );

      deals.set(newDeals);
      parameters.set(newParameters);
      isLastColumn && subscriptions.ping('table-key');
      subscriptions.ping('table');
    };

    return (
      <div
        className="dsg-context-menu"
        style={{ left: `${clientX}px`, top: `${clientY}px` }}
        ref={containerRef}
      >
        {items.map((item) => (
          <div
            key={item.type}
            onClick={item.action}
            className="dsg-context-menu-item"
            children={renderItem(item)}
          />
        ))}
        {cursorIndex?.col >= 0 && parameters.get.length > 1 && (
          <div
            className="dsg-context-menu-item"
            onClick={removeColumn}
            children="Удалить столбец"
          />
        )}
      </div>
    );
  };

const ContextMenu = createContextMenuComponent((item: rdg.ContextMenuItem) => {
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

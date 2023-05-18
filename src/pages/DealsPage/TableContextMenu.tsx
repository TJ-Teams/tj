import { useEffect, useRef } from 'react';
import * as rdg from 'react-datasheet-grid';
import { Deal } from '~/types/deals';
import { useDealsContext } from './deals-context';

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

    const isFirstColumn = cursorIndex?.col === 0;
    const isLastColumn = cursorIndex?.col === parameters.get.length - 1;
    const isShowMoveItems =
      cursorIndex?.row === -1 &&
      cursorIndex?.col >= 0 &&
      parameters.get.length > 1;

    console.log(cursorIndex, isFirstColumn, isLastColumn);

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

    const moveColumn = (side: 'left' | 'right') => () => {
      const currentIndex = cursorIndex?.col;
      const parameter = parameters.get.at(cursorIndex?.col);
      close();
      if (!parameter) return;

      const nextIndex = currentIndex + (side === 'left' ? -1 : 1);
      const newParameters = parameters.get;
      newParameters[currentIndex] = newParameters[nextIndex];
      newParameters[nextIndex] = parameter;

      parameters.set(newParameters);
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
        {isShowMoveItems && !isFirstColumn && (
          <div
            className="dsg-context-menu-item"
            onClick={moveColumn('left')}
            children="Переместить столбец влево"
          />
        )}
        {isShowMoveItems && !isLastColumn && (
          <div
            className="dsg-context-menu-item"
            onClick={moveColumn('right')}
            children="Переместить столбец вправо"
          />
        )}
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

export default createContextMenuComponent((item: rdg.ContextMenuItem) => {
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

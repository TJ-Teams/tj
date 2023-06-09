import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import * as xlsx from 'xlsx';
import { Deal, Parameter, ProviderType, TypeParameter } from '~/types/deals';
import { isDefined } from './is-defined';

const startString =
  '1.1 Информация о совершенных и исполненных сделках на конец отчетного периода';

const endString =
  '1.2 Информация о неисполненных сделках на конец отчетного периода';

const parameters: Parameter[] = [
  { key: 'date', name: 'Дата заключения', type: 'date' },
  { key: 'time', name: 'Время', type: 'string' },
  { key: 'marketplace', name: 'Торговая площадка', type: 'string' },
  { key: 'trading-mode', name: 'Режим торгов', type: 'string' },
  { key: 'deal-type', name: 'Вид сделки', type: 'string' },
  { key: 'name', name: 'Код актива', type: 'string' },
  { key: 'unit-price', name: 'Цена за единицу', type: 'number' },
  { key: 'price-currency', name: 'Валюта цены', type: 'string' },
  { key: 'amount', name: 'Количество', type: 'number' },
  { key: 'total', name: 'Сумма сделки', type: 'number' },
  { key: 'payment-currency', name: 'Валюта расчетов', type: 'string' },
  { key: 'broker', name: 'Контрагент / Брокер', type: 'string' },
];

const parametersMap = new Map(parameters.map((p) => [p.name, p]));

const selectRangeIn = (sheet: xlsx.Sheet): void => {
  const range = xlsx.utils.decode_range(sheet['!ref']!);
  let startRow: number | undefined;
  let endRow: number | undefined;

  for (let r = range.s.r; r < range.e.r; ++r) {
    const cell0 = xlsx.utils.encode_cell({ r, c: 0 });
    const cell1 = xlsx.utils.encode_cell({ r, c: 1 });
    if (sheet[cell0]?.v === startString || sheet[cell1]?.v === startString) {
      startRow = r + 1;
      continue;
    }
    if (sheet[cell0]?.v === endString || sheet[cell1]?.v === endString) {
      endRow = r - 1;
      break;
    }
  }

  if (!startRow || !endRow) {
    throw new Error('Invalid file');
  }

  sheet['!ref'] = xlsx.utils.encode_range({
    ...range,
    s: { ...range.s, r: startRow },
    e: { ...range.e, r: endRow },
  });
};

const clearProperties = (object: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(object)
      .filter(([key, _]) => Boolean(key) && !key.startsWith('_'))
      .map(([key, value]) => [key.replace(/\n|\r|\t/g, ''), value])
  );

const castValueToType = (
  value: string,
  type: TypeParameter
): number | string | Date | undefined => {
  switch (type) {
    case 'date':
      const date = dayjs.utc(value, 'DD.MM.YYYY');
      return date.isValid() ? date.format('YYYY-MM-DD') : undefined;
    case 'number':
      return parseFloat(value.replaceAll(',', '.'));
    default:
      return value;
  }
};

const toDeal = (object: Record<string, string>): Deal => {
  const deal = Object.fromEntries(
    Object.entries(object)
      .map(([name, value]) => {
        const parameter = parametersMap.get(name);
        if (!parameter) return undefined;
        return [parameter.key, castValueToType(value, parameter.type)];
      })
      .filter(isDefined)
  );
  return { ...deal, id: uuidV4(), 'provider-type': ProviderType.Tinkoff };
};

const importTinkoffDeals = async (
  file: File
): Promise<[Parameter[], Deal[]]> => {
  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  selectRangeIn(sheet);

  const result = xlsx.utils
    .sheet_to_json<Record<string, string>>(sheet)
    .map(clearProperties)
    .filter((object) => {
      return (
        Object.entries(object).filter(([key, value]) => {
          return key !== value.replace(/\n|\r|\t/g, '') && Boolean(value);
        }).length > 0
      );
    });

  if (result.length === 0) {
    throw new Error('No deals in file');
  }

  const deals = result.map(toDeal).sort((a, b) => {
    return (
      (b?.date ? new Date(b.date).getTime() : 0) -
      (a?.date ? new Date(a.date).getTime() : 0)
    );
  });

  return [parameters, deals];
};

export default importTinkoffDeals;

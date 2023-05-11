import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import * as xlsx from 'xlsx';
import { Deal, Parameter, ProviderType, TypeParameter } from '~/types/deals';
import { isDefined } from './is-defined';

const headerLine = 'Сделки,Header';
const bodyLine = 'Сделки,Data';

const splitColumns: Record<string, (value: string) => [string, string][]> = {
  Символ: (value: string) => {
    const [name] = value.split(' ');
    return [['Название компании', name]];
  },
  Количество: (value: string) => {
    const number = parseInt(value);
    const dealType = number > 0 ? 'Покупка' : 'Продажа';
    return [
      ['Количество', Math.abs(number).toString()],
      ['Вид сделки', dealType],
    ];
  },
  'Дата/Время': (value: string) => {
    const [date, time] = value.split(',');
    return [
      ['Дата', date?.trim()],
      ['Время', time?.trim()],
    ];
  },
};

const parameters: Parameter[] = [
  { key: 'name', name: 'Название компании', type: 'string' },
  { key: 'date', name: 'Дата', type: 'date' },
  { key: 'time', name: 'Время', type: 'string' },
  { key: 'amount', name: 'Количество', type: 'number' },
  { key: 'deal-type', name: 'Вид сделки', type: 'string' },
  { key: 'total', name: 'Выручка', type: 'number' },
  { key: 'price-currency', name: 'Валюта', type: 'string' },
];

const parametersMap = new Map(parameters.map((p) => [p.name, p]));

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject('Empty result');
      }
    };

    reader.onerror = () => {
      reject('File read error');
    };

    reader.readAsText(file, 'utf8');
  });
};

const normalizeFile = async (file: File): Promise<Uint8Array> => {
  const data = await readFile(file);
  const normalizedData = data
    .split('\n')
    .filter((l) => l.startsWith(bodyLine) || l.startsWith(headerLine))
    .join('\n');

  return new TextEncoder().encode(normalizedData);
};

const castValueToType = (
  value: string,
  type: TypeParameter
): number | string | Date | undefined => {
  switch (type) {
    case 'date':
      const date = dayjs.utc(value, 'YYYY-MM-DD');
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
  return {
    ...deal,
    id: uuidV4(),
    'provider-type': ProviderType.InteractiveBrokers,
  };
};

const importInteractiveDeals = async (
  file: File
): Promise<[Parameter[], Deal[]]> => {
  const buffer = await normalizeFile(file);
  const workbook = xlsx.read(buffer, { raw: true, codepage: 65001 });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const result = xlsx.utils.sheet_to_json<Record<string, string>>(sheet, {
    raw: false,
  });

  const extendedResult = result.map((r) => {
    return Object.fromEntries(
      Object.entries(r).flatMap(
        ([name, value]) => splitColumns[name]?.(value) || [[name, value]]
      )
    ) as Record<string, string>;
  });

  if (extendedResult.length === 0) {
    throw new Error('No deals in file');
  }

  const deals = extendedResult.map(toDeal);

  return [parameters, deals];
};

export default importInteractiveDeals;

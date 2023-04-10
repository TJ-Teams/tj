import * as xlsx from 'xlsx';
import { Deal, Parameter, TypeParameter } from '~/types/deals';
import { v4 as uuidV4 } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isDefined } from './is-defined';

dayjs.extend(customParseFormat);

const startString =
  '1.1 Информация о совершенных и исполненных сделках на конец отчетного периода';

const endString =
  '1.2 Информация о неисполненных сделках на конец отчетного периода';

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

const normalizeParameterKey = (key: string) =>
  key
    .trim()
    .toLowerCase()
    .replace(/[.,()%\/]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');

const detectValueType = (value: string): TypeParameter => {
  if (dayjs(value, 'DD.MM.YYYY', true).isValid()) return 'date';
  if (value.length > 0 && !isNaN(Number(value.replaceAll(',', '.')))) {
    return 'number';
  }
  return 'string';
};

const castValueToType = (
  value: string,
  type: TypeParameter
): number | string | Date => {
  switch (type) {
    case 'date':
      return dayjs(value, 'DD.MM.YYYY').toDate();
    case 'number':
      return parseFloat(value.replaceAll(',', '.'));
    default:
      return value;
  }
};

const toDeal =
  (parametersMap: Map<string, Parameter>) =>
  (object: Record<string, string>): Deal => {
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
    };
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

  const parametersMap = new Map<string, Parameter>(
    Object.entries(result[0]).map(([name, value]) => {
      const parameter: Parameter = {
        name,
        key: normalizeParameterKey(name),
        type: detectValueType(value),
      };
      return [name, parameter];
    })
  );

  const deals = result.map(toDeal(parametersMap));

  return [[...parametersMap.values()], deals];
};

export default importTinkoffDeals;

import dayjs from 'dayjs';
import * as xlsx from 'xlsx';
import { Deal, Parameter, toTypeParameter, TypeParameter } from '~/types/deals';
import { v4 as uuidV4 } from 'uuid';
import { isDefined } from './is-defined';

const extractParameters = (sheet: xlsx.Sheet): Parameter[] => {
  const parameters: Parameter[] = [];
  const range = xlsx.utils.decode_range(sheet['!ref']!);

  for (let c = range.s.c; c <= range.e.c; ++c) {
    const cell = xlsx.utils.encode_cell({ c, r: 0 });
    if (sheet[cell]?.v) {
      const [key, name, type] = (sheet[cell].v as string).split(':');
      if (!key) throw new Error('Invalid header');
      sheet[cell].v = key;
      parameters.push({
        key,
        name: name || key,
        type: toTypeParameter(type),
      });
    }
  }

  return parameters;
};

const castValueToType = (
  value: string,
  type: TypeParameter
): number | string | Date | undefined => {
  switch (type) {
    case 'date':
      const date = dayjs.utc(value, 'M/DD/YY');
      return date.isValid() ? date.format('M/DD/YY') : undefined;
    case 'number':
      return parseFloat(value.replaceAll(',', '.'));
    default:
      return value;
  }
};

const toDeal = (parameters: Parameter[]) => {
  const parametersMap = new Map(parameters.map((p) => [p.key, p]));

  return (object: Record<string, string>): Deal => {
    const deal = Object.fromEntries(
      Object.entries(object)
        .map(([name, value]) => {
          const parameter = parametersMap.get(name);
          if (!parameter) return undefined;
          return [parameter.key, castValueToType(value, parameter.type)];
        })
        .filter(isDefined)
    );
    return { ...deal, id: uuidV4() };
  };
};

const importTjDeals = async (file: File): Promise<[Parameter[], Deal[]]> => {
  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { raw: true, codepage: 65001 });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const parameters = extractParameters(sheet);
  const result = xlsx.utils.sheet_to_json<Record<string, string>>(sheet, {
    raw: false,
  });

  if (result.length === 0) {
    throw new Error('No deals in file');
  }

  const deals = result.map(toDeal(parameters));

  return [parameters, deals];
};

export default importTjDeals;

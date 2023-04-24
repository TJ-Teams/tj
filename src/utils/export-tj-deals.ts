import * as xlsx from 'xlsx';
import { Deal, Parameter } from '~/types/deals';

const expandHeaders = (sheet: xlsx.WorkSheet, parameters: Parameter[]) => {
  const parametersMap = new Map(parameters.map((p) => [p.key, p]));
  const range = xlsx.utils.decode_range(sheet['!ref']!);

  for (let c = range.s.c; c <= range.e.c; ++c) {
    const cell = xlsx.utils.encode_cell({ c, r: 0 });
    const parameter = parametersMap.get(sheet[cell]?.v);
    if (sheet[cell]?.v && parameter) {
      sheet[cell].v = `${parameter.key}:${parameter.name}:${parameter.type}`;
    }
  }
};

const exportTjDeals = (parameters: Parameter[], deals: Deal[]): string => {
  const normalizedDeals = deals.map((d) =>
    Object.fromEntries(Object.entries(d).filter(([key, _]) => key !== 'id'))
  );
  const sheet = xlsx.utils.json_to_sheet(normalizedDeals);
  expandHeaders(sheet, parameters);
  const csv = xlsx.utils.sheet_to_csv(sheet, { strip: true });

  return `sep=,\n${csv}`;
};

export default exportTjDeals;

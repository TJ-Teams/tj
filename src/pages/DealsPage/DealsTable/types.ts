export type Column = {
  key: string;
  name: string;
  type: TypeCell;
};

export type Row = Record<string, number | string | Date>;

export type TypeCell = 'string' | 'number' | 'date';

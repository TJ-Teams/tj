export type Parameter = {
  key: string;
  name: string;
  type: TypeParameter;
};

export type Deal = {
  id: string;
  [key: string]: number | string | Date | undefined;
};

export type TypeParameter = 'string' | 'number' | 'date';

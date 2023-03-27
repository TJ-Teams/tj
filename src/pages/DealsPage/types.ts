export type Parameter = {
  key: string;
  name: string;
  type: TypeParameter;
};

export type Deal = Record<string, number | string | Date | undefined>;

export type TypeParameter = 'string' | 'number' | 'date';

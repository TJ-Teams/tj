export type Parameter = {
  key: string;
  name: string;
  type: TypeParameter;
  isCustom?: boolean;
};

export type Deal = {
  id: string;
  [key: string]: number | string | Date | undefined;
};

export type TypeParameter = 'string' | 'number' | 'date';

export type DealsDto = {
  parameters: Parameter[];
  deals: Record<string, Deal>;
};

export type Parameter = {
  key: string;
  name: string;
  type: TypeParameter;
  isCustom?: boolean;
};

export enum ProviderType {
  Tinkoff = 'Tinkoff',
  InteractiveBrokers = 'IB',
  TradersJournal = 'TJ',
}

export type Deal = {
  id: string;
  'provider-type': ProviderType;
  [key: string]: number | string | Date | undefined;
};

export type TypeParameter = 'string' | 'number' | 'date';

export const toTypeParameter = (
  value?: string,
  defaultValue: TypeParameter = 'string'
): TypeParameter => {
  return value && ['date', 'number', 'date'].includes(value)
    ? (value as TypeParameter)
    : defaultValue;
};

export type DealsDto = {
  parameters: Parameter[];
  deals: Record<string, Deal>;
};

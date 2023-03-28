const declination = (value: number, forms: [string, string, string]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const strId =
    value % 100 > 4 && value % 100 < 20
      ? 2
      : cases[value % 10 < 5 ? value % 10 : 5];

  return forms[strId];
};

export default {
  required: 'Заполните поле',
  maxLength: (length: number) => {
    const symbol = declination(length, ['символ', 'символа', 'символов']);
    return `Максимальная допустимая длина ${length} ${symbol}`;
  },
};

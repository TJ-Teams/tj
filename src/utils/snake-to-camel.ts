const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));

export default snakeToCamel;

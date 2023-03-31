const getJsonOrElse = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

const setJson = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default {
  getJsonOrElse,
  setJson,
};

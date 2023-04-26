const get = (key: string): string | undefined => {
  const item = localStorage.getItem(key);
  return item || undefined;
};

const getJsonOrElse = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

const set = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const setJson = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};

export default {
  get,
  getJsonOrElse,
  set,
  setJson,
  remove,
};

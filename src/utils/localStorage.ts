function getLocalStorageItem<T>(key: string, initialState: T) {
  const fetchedItem = localStorage.getItem(key);
  if (fetchedItem === null) return initialState;
  return JSON.parse(fetchedItem) as T;
}

function setLocalStorageItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getLocalStorageItem, setLocalStorageItem };

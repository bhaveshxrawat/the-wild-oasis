import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [data, setData] = useState(getLocalStorageItem(key, initialValue));
  useEffect(() => {
    setLocalStorageItem(key, data);
  }, [key, data]);

  return [data, setData] as const;
}

import { Dispatch, SetStateAction, useState } from 'react';

type UseLocalStorageReturnType<T> = [T, Dispatch<T>, boolean, Error | null];

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : setLocalStorageValue(initialValue);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setLocalStorageValue: Dispatch<T> = (newValue: T) => {
    setIsLoading(true);
    try {
      const valueToStore = newValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setValue(valueToStore);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error as SetStateAction<Error | null>);
    }
  };

  return [value, setLocalStorageValue, isLoading, error];
};

export default useLocalStorage;

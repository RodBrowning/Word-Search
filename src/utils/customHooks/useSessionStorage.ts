import { Dispatch, SetStateAction, useState } from 'react';

type UseSessionStorageReturnType<T> = [T, Dispatch<T>, boolean, Error | null];

const useSessionStorage = <T>(key: string, initialValue: T): UseSessionStorageReturnType<T> => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setSessionStorageValue: Dispatch<T> = (newValue: T) => {
    setIsLoading(true);
    try {
      const valueToStore = newValue;
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      setValue(valueToStore);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error as SetStateAction<Error | null>);
    }
  };

  return [value, setSessionStorageValue, isLoading, error];
};

export default useSessionStorage;

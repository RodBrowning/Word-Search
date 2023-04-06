import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseSessionStorageReturnType<T> = [T, Dispatch<SetStateAction<T>>, boolean, Error | null];

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

  useEffect(() => {
    const storageListener = (event: StorageEvent) => {
      if (event.storageArea === window.sessionStorage && event.key === key) {
        setIsLoading(true);
        try {
          setValue(JSON.parse(event.newValue!));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setError(error as SetStateAction<Error | null>);
        }
      }
    };

    window.addEventListener('storage', storageListener);

    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, [key]);

  const setSessionStorageValue: Dispatch<SetStateAction<T>> = (newValue: SetStateAction<T>) => {
    setIsLoading(true);
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
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

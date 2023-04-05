import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseLocalStorageReturnType<T> = [T, Dispatch<SetStateAction<T>>, boolean, Error | null];

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
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
      if (event.storageArea === window.localStorage && event.key === key) {
        setIsLoading(true);
        try {
          setValue(JSON.parse(event.newValue!));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setError(error);
        }
      }
    };

    window.addEventListener('storage', storageListener);

    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, [key]);

  const setLocalStorageValue = (newValue: T) => {
    setIsLoading(true);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error);
    }
  };

  return [value, setLocalStorageValue, isLoading, error];
};

export default useLocalStorage;

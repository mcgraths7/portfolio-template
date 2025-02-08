import { useState, useEffect } from "react";

type FetchFunctionWithParams<T> = (param: string) => Promise<T>;
type FetchFunctionWithoutParams<T> = () => Promise<T>;

function useFetchData<T>(
  fetchFunction: FetchFunctionWithParams<T> | FetchFunctionWithoutParams<T>,
  param?: string
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = param
          ? await (fetchFunction as FetchFunctionWithParams<T>)(param)
          : await (fetchFunction as FetchFunctionWithoutParams<T>)();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction, param]);

  return { data, loading, error };
}

export default useFetchData;
import { useState, useEffect } from "react";

type FetchDataHook<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

function useFetchData<T>(fetchFunction: (param?: string) => Promise<T>, param?: string): FetchDataHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchFunction(param);
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

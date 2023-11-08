import React from "react";

type OptionsType = {
  method?: string;
  headers?: Record<string, string>;
};

type FetchDataType<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export function useFetch<T>(
  url: string,
  options?: OptionsType
): FetchDataType<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const HOST = import.meta.env.VITE_BACKEND_URL;

  const fetchData = React.useCallback(async () => {
    setLoading(true);

    const response = await fetch(`${HOST}/${url}`, options);
    const json = await response.json();

    if (!response.ok) {
      setData(null);
      setError(json.error);
      setLoading(false);
    } else {
      setData(json.data);
      setError(null);
      setLoading(false);
    }
  }, [options, url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}

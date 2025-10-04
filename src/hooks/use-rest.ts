'use client';
import { useQuery } from '@tanstack/react-query';

const createGet = <T>(url: string) => {
  return async () => {
    console.log('Fetching /api/dashboard/apps/iam');

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(
        `Network response was not ok: ${res.url}`,
      );
    }

    const data = await res.json();

    return data.app as T;
  };
};

export const useRest = <T>(url: string) => {
  const {
    data: resource,
    isLoading,
    error,
  } = useQuery<T>({
    queryKey: ['rest'],
    queryFn: createGet<T>(url),
    staleTime: 5 * 1000,
  });

  return {
    resource,
    isLoading,
    error,
  };
};

'use client';
import { Resource } from '@/lib/types';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const createFetchFn = <T>(url: string) => {
  return async () => {
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

    return data as T;
  };
};

const createMutationFn = <TBody, TResponse>(
  url: string,
  method: 'DELETE' | 'POST' | 'PUT' | 'PATCH',
) => {
  return async (body: TBody) => {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(
        `Network response was not ok: ${res.url}`,
      );
    }

    const data = await res.json();

    return data as TResponse;
  };
};

export const useRest = <T>(url: string) => {
  const {
    data: resource,
    isLoading,
    error,
  } = useQuery<Resource<T>>({
    queryKey: [url],
    queryFn: createFetchFn<Resource<T>>(url),
    staleTime: 5 * 1000,
  });

  return {
    resource,
    isLoading,
    error,
  };
};

export const useRestDelete = <T>(url: string) => {
  const queryClient = useQueryClient();

  // Extract the resource list URL by removing the last segment
  const parts = url.split('/');
  parts.pop();
  const resourceListUrl = parts.join('/');

  return useMutation<Resource<T>, Error, any>({
    mutationFn: createMutationFn<any, Resource<T>>(
      url,
      'DELETE',
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [url, resourceListUrl],
      });
    },
  });
};

export const useRestCreate = <TBody, T>(url: string) => {
  const queryClient = useQueryClient();

  return useMutation<Resource<T>, Error, TBody>({
    mutationFn: createMutationFn<TBody, Resource<T>>(
      url,
      'POST',
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [url],
      });
    },
  });
};

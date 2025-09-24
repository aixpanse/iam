import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

// Generic API response types
export interface ApiResponse<T> {
  error: string | null;
  errors: Array<{
    path: string[];
    message: string;
  }>;
}

export interface ListResponse<T> extends ApiResponse<T> {
  [key: string]: T[] | string | null | any[]; // Dynamic key for resource array (e.g., apps, users, etc.)
}

export interface CreateResponse extends ApiResponse<any> {}

// Generic API functions
export interface ApiConfig<T> {
  endpoint: string;
  resourceKey: string; // Key used in response (e.g., 'apps', 'users')
  queryKey: string[]; // Query key for caching (e.g., ['apps'], ['users'])
}

// Generic fetch function
const createFetchFunction = <T>(config: ApiConfig<T>) => {
  return async (): Promise<T[]> => {
    const response = await fetch(config.endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${config.resourceKey}`);
    }

    const data: ListResponse<T> = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return (data[config.resourceKey] as T[]) || [];
  };
};

// Generic create function
const createMutationFunction = <TData, TVariables>(
  config: ApiConfig<TData>,
) => {
  return async (variables: TVariables): Promise<CreateResponse> => {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });

    const data: CreateResponse = await response.json();
    return data;
  };
};

// Generic useQuery hook
export const createUseQuery = <T>(
  config: ApiConfig<T>,
  options?: Partial<UseQueryOptions<T[]>>,
) => {
  return () => {
    return useQuery({
      queryKey: config.queryKey,
      queryFn: createFetchFunction(config),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      ...options,
    });
  };
};

// Generic useMutation hook for creation
export const createUseMutation = <TData, TVariables>(
  config: ApiConfig<TData>,
  options?: Partial<UseMutationOptions<CreateResponse, Error, TVariables>>,
) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createMutationFunction<TData, TVariables>(config),
      onSuccess: () => {
        // Invalidate and refetch the resource list after successful creation
        queryClient.invalidateQueries({ queryKey: config.queryKey });
      },
      ...options,
    });
  };
};

// Generic update function
const createUpdateFunction = <TData, TVariables>(config: ApiConfig<TData>) => {
  return async (
    variables: TVariables & { id: string },
  ): Promise<CreateResponse> => {
    const { id, ...updateData } = variables;
    const response = await fetch(`${config.endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const data: CreateResponse = await response.json();
    return data;
  };
};

// Generic delete function
const createDeleteFunction = <TData>(config: ApiConfig<TData>) => {
  return async (id: string): Promise<CreateResponse> => {
    const response = await fetch(`${config.endpoint}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data: CreateResponse = await response.json();
    return data;
  };
};

// Generic useMutation hook for updates
export const createUseUpdateMutation = <TData, TVariables>(
  config: ApiConfig<TData>,
  options?: Partial<
    UseMutationOptions<CreateResponse, Error, TVariables & { id: string }>
  >,
) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createUpdateFunction<TData, TVariables>(config),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: config.queryKey });
      },
      ...options,
    });
  };
};

// Generic useMutation hook for deletion
export const createUseDeleteMutation = <TData>(
  config: ApiConfig<TData>,
  options?: Partial<UseMutationOptions<CreateResponse, Error, string>>,
) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createDeleteFunction<TData>(config),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: config.queryKey });
      },
      ...options,
    });
  };
};

// Enhanced CRUD operations factory
export const createResourceHooks = <
  TData,
  TCreateData = Partial<TData>,
  TUpdateData = Partial<TData>,
>(
  config: ApiConfig<TData>,
) => {
  const useList = createUseQuery(config);
  const useCreate = createUseMutation<TData, TCreateData>(config);
  const useUpdate = createUseUpdateMutation<TData, TUpdateData>(config);
  const useDelete = createUseDeleteMutation<TData>(config);

  return {
    useList,
    useCreate,
    useUpdate,
    useDelete,
    config, // Export config for potential custom hooks
  };
};

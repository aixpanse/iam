import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// User-specific types
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role?: string;
}

// Hook for fetching users by appId
export const useUsers = (appId: string) => {
  return useQuery<User[]>({
    queryKey: ["users", appId],
    queryFn: async (): Promise<User[]> => {
      const res = await fetch(`/api/dashboard/apps/${appId}/users`);
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      return data.users || [];
    },
    enabled: !!appId, // Only run query when appId is available
  });
};

// Hook for creating a user
export const useCreateUser = (appId: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserData>({
    mutationFn: async (userData: CreateUserData): Promise<User> => {
      const res = await fetch(`/api/dashboard/apps/${appId}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users", appId] });
    },
  });
};

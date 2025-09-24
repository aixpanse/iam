import { createResourceHooks } from "./use-api";

// App-specific types
export interface App {
  id: string;
  name: string;
  domain: string;
}

export interface CreateAppData {
  name: string;
  domain: string;
}

// App-specific configuration
const appsConfig = {
  endpoint: "/api/dashboard/apps",
  resourceKey: "apps",
  queryKey: ["apps"],
};

// Create app-specific hooks using the generic factory
const {
  useList: useAppsQuery,
  useCreate: useCreateAppMutation,
  useUpdate: useUpdateAppMutation,
  useDelete: useDeleteAppMutation,
} = createResourceHooks<App, CreateAppData, CreateAppData>(appsConfig);

// Export with more descriptive names
export const useApps = useAppsQuery;
export const useCreateApp = useCreateAppMutation;
export const useUpdateApp = useUpdateAppMutation;
export const useDeleteApp = useDeleteAppMutation;

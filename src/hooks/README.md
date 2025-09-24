# Generic API Hooks Documentation

This generic API hook system allows you to easily create React Query hooks for any resource in your application.

## Features

- ✅ **Generic CRUD Operations**: List, Create, Update, Delete
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Automatic Caching**: Built-in React Query caching and invalidation
- ✅ **Error Handling**: Consistent error handling across all resources
- ✅ **Loading States**: Built-in loading indicators
- ✅ **Retry Logic**: Automatic retry on failure

## Basic Usage

### 1. Define your resource types

```typescript
interface MyResource {
  id: string;
  name: string;
  // other fields...
}

interface CreateMyResourceData {
  name: string;
  // other fields for creation...
}
```

### 2. Create resource-specific hooks

```typescript
import { createResourceHooks } from "./use-api";

const myResourceConfig = {
  endpoint: "/api/my-resources",
  resourceKey: "myResources", // Key used in API response
  queryKey: ["myResources"], // React Query cache key
};

const {
  useList: useMyResourcesQuery,
  useCreate: useCreateMyResourceMutation,
  useUpdate: useUpdateMyResourceMutation,
  useDelete: useDeleteMyResourceMutation,
} = createResourceHooks<MyResource, CreateMyResourceData>(myResourceConfig);

// Export with descriptive names
export const useMyResources = useMyResourcesQuery;
export const useCreateMyResource = useCreateMyResourceMutation;
export const useUpdateMyResource = useUpdateMyResourceMutation;
export const useDeleteMyResource = useDeleteMyResourceMutation;
```

### 3. Use in components

```typescript
// List resources
function ResourceList() {
  const { data: resources = [], isLoading, error } = useMyResources();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {resources.map(resource => (
        <li key={resource.id}>{resource.name}</li>
      ))}
    </ul>
  );
}

// Create resource
function CreateResourceForm() {
  const createMutation = useCreateMyResource();

  const handleSubmit = (data: CreateMyResourceData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        console.log('Resource created successfully!');
        // Form will be reset automatically
        // List will be refreshed automatically
      },
      onError: (error) => {
        console.error('Failed to create resource:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button
        type="submit"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
```

## Advanced Usage

### Custom query options

```typescript
const useMyResourcesWithCustomOptions = createUseQuery(myResourceConfig, {
  staleTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
});
```

### Custom mutation options

```typescript
const useCreateMyResourceWithToast = createUseMutation(myResourceConfig, {
  onSuccess: () => {
    toast.success("Resource created successfully!");
  },
  onError: (error) => {
    toast.error(`Failed to create resource: ${error.message}`);
  },
});
```

## Examples

### Apps (already implemented)

- `useApps()` - List all apps
- `useCreateApp()` - Create new app
- `useUpdateApp()` - Update existing app
- `useDeleteApp()` - Delete app

### Users (example implementation)

- `useUsers()` - List all users
- `useCreateUser()` - Create new user
- `useUpdateUser()` - Update existing user
- `useDeleteUser()` - Delete user

### Any other resource

Just follow the same pattern with your own types and configuration!

## API Response Format

Your API endpoints should return responses in this format:

### List endpoint (GET /api/resource)

```json
{
  "resourceKey": [...], // Array of resources
  "error": null,
  "errors": []
}
```

### Create/Update/Delete endpoints (POST/PUT/DELETE)

```json
{
  "error": null,
  "errors": [
    {
      "path": ["fieldName"],
      "message": "Error message"
    }
  ]
}
```

## Benefits

1. **Consistency**: All resources follow the same patterns
2. **DRY**: No need to rewrite similar hooks for each resource
3. **Type Safety**: Full TypeScript support with proper generics
4. **Maintainability**: Changes to the generic system apply to all resources
5. **Testing**: Easy to test since all resources use the same underlying logic

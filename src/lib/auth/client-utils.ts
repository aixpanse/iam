import { Models } from "node-appwrite";

/**
 * Client-side utility to check if a user has IAM access
 * This can be safely used in client components
 */
export function hasIamAccess(user: Models.User | null): boolean {
  return user?.labels?.includes("iam") ?? false;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: Models.User | null): boolean {
  return user !== null;
}

import { getLoggedInUser } from "@/lib/auth/appwrite";
import { NextResponse } from "next/server";

/**
 * Middleware function to check IAM access for API routes
 * Returns an error response if user doesn't have access, otherwise returns null
 */
export async function checkIamAccess(): Promise<NextResponse | null> {
  const user = await getLoggedInUser();

  if (!user?.labels?.includes("iam")) {
    return NextResponse.json(
      { error: "Not allowed", errors: [] },
      { status: 403 },
    );
  }

  return null;
}

/**
 * Higher-order function that wraps API route handlers with IAM access check
 */
export function withIamApiAccess<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
) {
  return async (...args: T): Promise<NextResponse> => {
    const accessError = await checkIamAccess();
    if (accessError) {
      return accessError;
    }

    return handler(...args);
  };
}

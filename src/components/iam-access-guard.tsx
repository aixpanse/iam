import { getLoggedInUser } from "@/lib/auth/appwrite"
import { redirect } from "next/navigation"

/**
 * Higher-order component that checks if the user has IAM access before rendering the component
 */
export async function withIamAccess<T extends object>(
    Component: React.ComponentType<T>
) {
    return async function IamProtectedComponent(props: T) {
        const user = await getLoggedInUser()

        // Redirect to signin if not logged in
        if (!user) {
            redirect("/signin")
        }

        // Check if user has "iam" label for dashboard access
        if (!user.labels?.includes("iam")) {
            redirect("/unauthorized")
        }

        return <Component {...props} />
    }
}

/**
 * Server component that checks IAM access for child components
 */
export async function IamAccessGuard({ children }: { children: React.ReactNode }) {
    const user = await getLoggedInUser()

    // Redirect to signin if not logged in
    if (!user) {
        redirect("/auth/signin")
    }

    // Check if user has "iam" label for dashboard access
    if (!user.labels?.includes("iam")) {
        redirect("/unauthorized")
    }

    return <>{children}</>
}
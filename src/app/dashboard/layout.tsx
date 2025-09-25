import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getLoggedInUser()

    // Redirect to signin if not logged in
    if (!user) {
        redirect("/auth/signin")
    }

    // Check if user has "iam" label for dashboard access
    if (!user.labels?.includes("iam")) {
        redirect("/unauthorized")
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
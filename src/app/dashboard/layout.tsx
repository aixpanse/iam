import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { redirect } from "next/navigation"
import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getLoggedInUser();

    // Redirect to signin if not logged in
    if (!user) {
        redirect("/auth/signin")
    }

    // Check if user has "iam" label for dashboard access
    if (!user.labels?.includes("iam")) {
        redirect("/unauthorized")
    }

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full min-h-screen flex flex-col">
                    <AppBar showSidebar={true} />
                    <div className="flex-1">
                        {children}
                    </div>
                    <Footer />
                </main>
            </SidebarProvider>
        </div>
    )
}
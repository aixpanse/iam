import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { get } from "http"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Apps",
        url: "/dashboard/apps",
        icon: Inbox,
    },
]

export async function AppSidebar() {
    const user = await getLoggedInUser();

    return (
        <Sidebar>
            <SidebarHeader >
                <a href="/">IAM</a>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <div className="flex items-center justify-between gap-3 p-2">
                    {user?.name}
                    <Avatar className="">
                        <AvatarImage src="" alt="@shadcn" />
                        <AvatarFallback >{user?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
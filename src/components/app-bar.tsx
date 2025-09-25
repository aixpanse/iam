'use client';
import { hasIamAccess } from "@/lib/auth/client-utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import { getLoggedInUser } from "@/lib/auth/appwrite";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppBar({ showSidebar }: { showSidebar?: boolean }) {
    const [user, setUser] = useState<Models.User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const user = await getLoggedInUser();
            setUser(user);
        }
        fetchData();
    }, []);

    const handleLogout = async () => {
        fetch('/api/signout', { method: 'POST', body: JSON.stringify({ sessionId: 'current' }) })
            .then(() => {
                router.push('/');
                setUser(null);
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="sticky top-0 z-40 bg-background border-b px-6 py-4 z-50 w-full flex items-center justify-between">
            {showSidebar ? <SidebarTrigger className="" variant="ghost" /> : <div></div>}
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="" alt="@shadcn" />
                            <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        {hasIamAccess(user) && (
                            <DropdownMenuItem onClick={() => router.push('/dashboard')}>Dashboard</DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => router.push('/auth/account')} disabled={!user}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} disabled={!user}>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <ModeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
'use client'
import { LogoutButton } from "@/components/logoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createSessionClient, getLoggedInUser } from "@/lib/auth/appwrite";
import { hasIamAccess } from "@/lib/auth/client-utils";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { Models } from "node-appwrite";
import { use, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
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
    <div className="h-screen bg-gradient-to-t from-gray-100 to-gray-500 py-30 px-6">
      <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-black/10 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-white"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {hasIamAccess(user) && (
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>Dashboard</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => router.push('/auth/account')} disabled={!user}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={!user}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <div className="flex flex-col gap-4 max-w-lg">
          <h1 className="text-5xl font-bold">IAM</h1>
          <h6 className="text-2xl">Identity Access Management</h6>
          <p>
            The simplest way to manage user identities and access rights. If you want to add
            login to your app, you are in the right place!
          </p>
          <div>
            <Button onClick={() => router.push('/auth/signin')} variant="secondary" className="mr-4">Log in</Button>
            <Button onClick={() => router.push('/auth/signup')} className="cursor-pointer">Create account</Button>
          </div>
        </div>
        <img src="/password-lock-key-dark.png" alt="Logo" className="hidden md:block w-100 h-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-black/10 px-6 py-4">
        <div className="flex justify-between items-center text-gray-800">
          <div className="text-sm">
            © 2024 IAM. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="/contact" className="hover:text-gray-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}

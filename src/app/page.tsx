'use client'
import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "@/lib/auth/appwrite";
import { useRouter } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";

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
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="w-full flex flex-row gap-4 items-start justify-center p-8">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

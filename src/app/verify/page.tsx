'use client'
import { AlertCircleIcon, GalleryVerticalEnd } from "lucide-react"
import { IconCheck } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { redirect, useSearchParams } from "next/navigation"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Models } from "node-appwrite"

export default function VerifyPage() {
  const [user, setUser] = useState<Models.User | null>(null);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  let secret = searchParams.get('secret');
  let userId = searchParams.get('userId');


  useEffect(() => {
    const verify = async () => {
      const user = await getLoggedInUser();
      if (!user) {
        await setCookie('verify', JSON.stringify({ secret, userId }));
        return redirect(`/signin?redirectUrl=/verify`);
      }

      setUser(user);

      if (user.emailVerification === false) {
        const credentials = await getVerifyCredentials();

        if (!credentials) return;

        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const { error } = await res.json();
        setError(error);
      }
    }
    verify();
  }, []);

  const getVerifyCredentials = async () => {
    if (!secret && !userId) {
      const cookie = JSON.parse(await getCookie('verify') || '{}');
      secret = cookie.secret;
      userId = cookie.userId;
      await deleteCookie('verify');
    }
    if (!secret || !userId) {
      setError('Invalid verification link');
      return;
    }
    return { secret, userId };
  }

  if (!user) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Acme Inc.
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col space-y-5">
              <div className="space-y-2">
                <Skeleton className="mx-10 h-10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="mx-30 w-15 h-4 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="mx-30 w-15 h-4 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/iam.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div >
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {error && <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to verify</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
              </AlertDescription>
            </Alert>}
            {!error && <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Account verified</h1>
              <IconCheck className="text-green-600" />
            </div>}
            <Button variant="link" className="w-full" onClick={() => redirect('/')}>
              Back to your app
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/iam.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

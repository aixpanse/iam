"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AlertCircleIcon, Loader2Icon, BadgeCheckIcon, BadgeAlertIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { Badge } from "@/components/ui/badge"
import { Models } from "node-appwrite"
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const DeleteFormSchema = z.object({
  delete: z.string().refine((val) => val === "delete", {
    message: "You must type 'delete' to remove account"
  }),
  formError: z.string().optional(),
});

const UserFormSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  formError: z.string().optional(),
});

export default function AccountPage() {
  const deleteForm = useForm<z.infer<typeof DeleteFormSchema>>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: { delete: "" },
  });
  const userForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: { email: "", name: "" },
  });
  const [user, setUser] = useState<Models.User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser();
      setUser(user);
      if (!user) redirect('/auth/signin');
      console.log(user);
      userForm.reset({ name: user.name, email: user.email });
    };
    fetchUser();
  }, []);

  async function onSubmitDelete(payload: z.infer<typeof DeleteFormSchema>) {
    const res = await fetch("/api/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    // apply errors to inputs
    for (const error of data.errors) {
      for (const field of error.path) {
        deleteForm.setError(field, { message: error.message }, { shouldFocus: true })
      }
    }

    // applay error to whole form
    if (data.error) {
      deleteForm.setError('formError', { type: 'manual', message: data.error });
    } else {
      deleteForm.clearErrors();
      redirect('/auth/signin');
    }
  }

  async function onSubmitUser(payload: z.infer<typeof UserFormSchema>) {
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    // apply errors to inputs
    for (const error of data.errors) {
      for (const field of error.path) {
        deleteForm.setError(field, { message: error.message }, { shouldFocus: true })
      }
    }

    // applay error to whole form
    if (data.error) {
      userForm.setError('formError', { type: 'manual', message: data.error });
    } else {
      userForm.clearErrors();
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col space-y-5">
        <div className="space-y-2">
          <Skeleton className="mx-10 h-10 rounded-xl" />
          <Skeleton className="mx-30 h-4 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-10" />
        <Skeleton className="h-1" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-10" />
      </div>
    )
  }

  return (
    <div>
      <Form {...userForm}>
        <form onSubmit={userForm.handleSubmit(onSubmitUser)} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Account details</h1>
            <Badge
              variant={user.emailVerification ? "secondary" : "destructive"}
            >
              {user?.emailVerification ? <BadgeCheckIcon /> : <BadgeAlertIcon />}
              {user?.emailVerification ? "Verified" : "Unverified"}
            </Badge>
          </div>
          {userForm.formState.errors.formError && <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Your account</AlertTitle>
            <AlertDescription>
              <p>{userForm.formState.errors.formError.message}</p>
            </AlertDescription>
          </Alert>}
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={userForm.formState.isSubmitting || !userForm.formState.isDirty}>
              {userForm.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
              Save
            </Button>
            <Separator className="mb-4" />
          </div>
        </form>
      </Form>
      <Form {...deleteForm}>
        <form onSubmit={deleteForm.handleSubmit(onSubmitDelete)} className={cn("flex flex-col gap-6")}>
          {deleteForm.formState.errors.formError && <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unabled to delete account</AlertTitle>
            <AlertDescription>
              <p>{deleteForm.formState.errors.formError.message}</p>
            </AlertDescription>
          </Alert>}
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormField
                control={deleteForm.control}
                name="delete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type <b>delete</b> to remove account</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 text-white" disabled={deleteForm.formState.isSubmitting}>
              {deleteForm.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
              Delete Account
            </Button>
          </div>
        </form>
      </Form>
      <Button variant="link" className="w-full mt-4" onClick={() => redirect('/')}>
        Back to your app
      </Button>
    </div>
  )
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { applyFormErrors, cn, hasFormErrors } from "@/lib/utils"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import { Models } from "node-appwrite"
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import FormError from "@/components/form-error";
import SubmitButton from "@/components/submit-button";
import FormInput from "@/components/form-input";
import UserBadge from "@/components/user-badge";
import { Form } from "@/components/ui/form";

export default function AccountPage() {
  const [user, setUser] = useState<Models.User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser();
      setUser(user);
      if (!user) redirect('/auth/signin');
    };
    fetchUser();
  }, []);

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
      <UserForm user={user} />
      <DeleteUserForm />
      <Button variant="link" className="w-full mt-4" onClick={() => redirect('/')}>
        Back to your app
      </Button>
    </div>
  )
}

const UserFormSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  formError: z.string().optional(),
});

function UserForm({ user }: { user: Models.User }) {
  const userForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: { email: user.email, name: user.name },
  });

  async function onSubmitUser(payload: z.infer<typeof UserFormSchema>) {
    const res = await fetch("/api/account", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (hasFormErrors(data)) {
      applyFormErrors(userForm, data);
    } else {
      userForm.reset(payload);
    }
  }

  return (
    <Form {...userForm}>
      <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Account details</h1>
          <UserBadge verified={user.emailVerification} />
        </div>
        <FormError
          hide={!userForm.formState.errors.formError}
          title="Unable to update account"
          description={userForm.formState.errors.formError?.message}
        />
        <FormInput name="name" label="Name" control={userForm.control} />
        <FormInput name="email" label="Email" control={userForm.control} disabled />
        <SubmitButton
          label="Save"
          loading={userForm.formState.isSubmitting}
          disabled={userForm.formState.isSubmitting || !userForm.formState.isDirty}
        />
        <Separator className="mb-4" />
      </form>
    </Form >
  )
}

const DeleteFormSchema = z.object({
  delete: z.string().refine((val) => val === "delete", {
    message: "You must type 'delete' to remove account"
  }),
  formError: z.string().optional(),
});

function DeleteUserForm() {
  const deleteForm = useForm<z.infer<typeof DeleteFormSchema>>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: { delete: "" },
  });

  async function onSubmitDelete(payload: z.infer<typeof DeleteFormSchema>) {
    const res = await fetch("/api/account", {
      method: "DELETE",
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (hasFormErrors(data)) {
      applyFormErrors(deleteForm, data);
    } else {
      redirect('/auth/signin');
    }
  }

  return (
    <Form {...deleteForm}>
      <form onSubmit={deleteForm.handleSubmit(onSubmitDelete)} className="flex flex-col gap-6">
        <FormError
          hide={!deleteForm.formState.errors.formError}
          title="Unable to delete account"
          description={deleteForm.formState.errors.formError?.message}
        />
        <FormInput
          name="delete" label="Type 'delete' to remove your account"
          control={deleteForm.control}
        />
        <SubmitButton
          label="Delete Account"
          loading={deleteForm.formState.isSubmitting}
          disabled={deleteForm.formState.isSubmitting}
          className="bg-red-600 text-white hover:bg-red-700"
        />
      </form>
    </Form >
  )
}

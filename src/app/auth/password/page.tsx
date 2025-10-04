"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { applyFormErrors, hasFormErrors } from "@/lib/utils"
import { redirect, useSearchParams } from "next/navigation"
import { IconCheck } from "@tabler/icons-react"
import FormError from "@/components/form-error"
import FormInput from "@/components/form-input"
import SubmitButton from "@/components/submit-button"

const FormSchema = z.object({
  password: z.string().min(8, { message: "Password must have at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must have at least 8 characters" }),
  formError: z.string().optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords are not the same',
    path: ['confirmPassword'],
  });

export default function UpdatePasswordPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const searchParams = useSearchParams();

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    const res = await fetch("/api/reset", {
      method: "PUT",
      body: JSON.stringify({
        password: payload.password,
        userId: searchParams.get('userId'),
        secret: searchParams.get('secret'),
      }),
    });
    const data = await res.json();

    if (hasFormErrors(data)) {
      applyFormErrors(form, data);
    }
  }

  if (form.formState.isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Passsword updated</h1>
        <p>Now you can sing in</p>
        <IconCheck className="text-green-600" />
        <Button variant="link" className="w-full" onClick={() => redirect('/auth/signin')}>
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-6"}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter your new password</h1>
        </div>
        <FormError
          hide={!form.formState.errors.formError}
          title="Unable to update password"
          description={form.formState.errors.formError?.message}
        />
        <FormInput type="password" name="password" label="Password" control={form.control} />
        <FormInput type="password" name="confirmPassword" label="Confirm Password" control={form.control} />
        <SubmitButton
          label="Save"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  )
}

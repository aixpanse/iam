"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { applyFormErrors, cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { IconCheck } from "@tabler/icons-react"
import FormError from "@/components/form-error"
import FormInput from "@/components/form-input"
import SubmitButton from "@/components/submit-button"

const FormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  formError: z.string().optional(),
})

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    const res = await fetch("/api/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    applyFormErrors(form, data);
  }

  if (form.formState.isSubmitSuccessful) {
    return (
      <div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <IconCheck className="text-green-600" />
        </div>
        <Button variant="link" className="w-full" onClick={() => redirect('/')}>
          Back to your app
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            Reset your password
          </h1>
        </div>
        <FormError
          hide={!form.formState.errors.formError}
          title="Unable to send reset email"
          description={form.formState.errors.formError?.message}
        />
        <FormInput name="email" label="Email" placeholder="m@example.com" control={form.control} />
        <SubmitButton
          label="Reset"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        />
      </form>
    </Form>
  )
}

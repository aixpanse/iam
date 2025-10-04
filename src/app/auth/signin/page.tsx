"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { applyFormErrors, cn, hasFormErrors } from "@/lib/utils"
import { useState } from "react"
import { setCookie } from 'cookies-next';
import { SESSION_ID } from "@/lib/auth/consts"
import { redirect, RedirectType, useSearchParams } from "next/navigation"
import { getLoggedInUser } from "@/lib/auth/appwrite"
import FormError from "@/components/form-error"
import FormInput from "@/components/form-input"
import SubmitButton from "@/components/submit-button"
import Link from "next/link"

const FormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: "Password must have at least 8 characters" }),
  formError: z.string().optional(),
});

export default function SigninPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const domain = redirectUrl?.startsWith('http') ? (new URL(redirectUrl)).hostname : undefined;

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, domain }),
      });
      const data = await res.json();

      if (hasFormErrors(data)) {
        applyFormErrors(form, data);
      } else {
        form.setValue('formError', '')
        console.log(data.session)
        await setCookie(SESSION_ID, data.session);
        if (!redirectUrl) {
          const user = await getLoggedInUser();
          console.log(user)
          if (!user?.labels?.includes('iam')) {
            await fetch("/api/signout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: 'current' }),
            });
            form.setValue('formError', 'You do not have an IAM account');
            return;
          }
          redirect('/dashboard');
        } else {
          if (redirectUrl.startsWith('http')) {
            const url = new URL(redirectUrl);
            url.searchParams.set('session', data.session);
            redirect(url.toString(), RedirectType.replace);
          } else {
            redirect(redirectUrl, RedirectType.replace);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            Login to your account
          </h1>
        </div>
        <FormError
          hide={!form.formState.errors.formError}
          title="Unable to login"
          description={form.formState.errors.formError?.message}
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="m@example.com"
          control={form.control}
        />
        <FormInput
          name="password"
          label="Password"
          placeholder="Your password"
          type="password"
          control={form.control}
        />
        <SubmitButton
          label="Login"
          loading={loading}
          disabled={loading}
        />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
        <a
          href="/auth/reset"
          className="text-center text-sm underline-offset-4 underline"
        >
          Forgot your password?
        </a>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={redirectUrl ? `/auth/signup?redirectUrl=${redirectUrl}` : '/auth/signup'} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}

"use client"
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
import { AlertCircleIcon, Loader2Icon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useState } from "react"
import { setCookie } from 'cookies-next';
import { SESSION_ID } from "@/lib/auth/consts"
import { redirect, useSearchParams } from "next/navigation"
import { getLoggedInUser } from "@/lib/auth/appwrite"


const FormSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: "Password must have at least 8 characters" }),
})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl');
    const domain = redirectUrl ? (new URL(redirectUrl)).hostname : undefined;

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

            // apply errors to inputs
            for (const error of data.errors) {
                for (const field of error.path) {
                    form.setError(field, { message: error.message }, { shouldFocus: true })
                }
            }

            // applay error to whole form
            if (data.error) {
                setFormError(data.error)
            } else {
                setFormError('')
                console.log(data.session)
                await setCookie(SESSION_ID, data.session);
                if (!redirectUrl) {
                    const user = await getLoggedInUser();
                    console.log(user)
                    if (!user?.labels?.includes('iam')) {
                        await fetch("/api/signout", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ sessionId: 'current' }),
                        });
                        setFormError('You do not have an IAM account');
                        return;
                    }
                    redirect('/dashboard');
                } else {
                    const url = new URL(redirectUrl);
                    url.searchParams.set('session', data.session);
                    redirect(url.toString());
                }


            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                </div>
                {formError && <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to login</AlertTitle>
                    <AlertDescription>
                        <p>{formError}</p>
                    </AlertDescription>
                </Alert>}
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password
                                        <a
                                            href="/reset"
                                            className="ml-auto text-sm underline-offset-4 hover:underline text-black"
                                        >
                                            Forgot your password?
                                        </a>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2Icon className="animate-spin" />}
                        Login
                    </Button>
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
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href={redirectUrl ? `/signup?redirectUrl=${redirectUrl}` : '/signup'} className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </form>
        </Form>

    )
}

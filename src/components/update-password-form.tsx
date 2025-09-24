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
import { redirect, useSearchParams } from "next/navigation"
import { IconCheck } from "@tabler/icons-react"

const FormSchema = z.object({
    password: z.string().min(8, { message: "Password must have at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must have at least 8 characters" }),
    formError: z.string().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords are not the same',
        path: ['confirmPassword'],
    });

export function UpdatePasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });
    const searchParams = useSearchParams();

    async function onSubmit(payload: z.infer<typeof FormSchema>) {
        const res = await fetch("/api/reset", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: payload.password,
                userId: searchParams.get('userId'),
                secret: searchParams.get('secret'),
            }),
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
            form.setError("formError", { type: 'manual', message: data.error })
        } else {
            form.clearErrors();
        }
    }

    if (form.formState.isSubmitSuccessful) {
        return (
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Passsword updated</h1>
                <p>Now you can sing in</p>
                <IconCheck className="text-green-600" />
                <Button variant="link" className="w-full" onClick={() => redirect('/signin')}>
                    Sign in
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Enter your new password</h1>
                </div>
                {form.formState.errors.formError && <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to update password</AlertTitle>
                    <AlertDescription>
                        <p>{form.formState.errors.formError.message}</p>
                    </AlertDescription>
                </Alert>}
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                        {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                        Save
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/signin" className="underline underline-offset-4">
                        Sign in
                    </a>
                </div>
            </form>
        </Form>

    )
}

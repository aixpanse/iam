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
    email: z.email({ message: 'Invalid email address' }),
    formError: z.string().optional(),
})

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { email: "" },
    })
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl');

    async function onSubmit(payload: z.infer<typeof FormSchema>) {
        const res = await fetch("/api/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
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
            form.setError("formError", { message: data.error }, { shouldFocus: true })
        } else {
            form.clearErrors();
        }
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">
                        Reset your password
                    </h1>
                </div>
                {form.formState.errors.formError && <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to login</AlertTitle>
                    <AlertDescription>
                        <p>{form.formState.errors.formError.message}</p>
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
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                        {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                        Reset
                    </Button>
                </div>
            </form>
        </Form>

    )
}

'use client';
import { Button } from "./ui/button";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useUpdateApp } from "@/hooks/use-apps";

const FormSchema = z.object({
    id: z.string().min(1, { message: "Id is required" }),
    name: z.string().min(1, { message: "App name is required" }),
    domain: z.string().min(1, { message: "Domain is required" }),
    formError: z.string().optional(),
});


export function UpdateAppForm({
    className,
    ...props
}: React.ComponentProps<"form"> & { app: { id: string; name: string; domain: string } }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { id: props.app.id, name: props.app.name, domain: props.app.domain },
    });
    const updateAppMutation = useUpdateApp();

    async function onSubmit(payload: z.infer<typeof FormSchema>) {
        updateAppMutation.mutate(payload, {
            onSuccess: (data) => {
                // apply errors to inputs
                for (const error of data.errors) {
                    for (const field of error.path) {
                        if (field === 'name' || field === 'domain') {
                            form.setError(field, { message: error.message }, { shouldFocus: true });
                        }
                    }
                }

                // apply error to whole form
                if (data.error) {
                    form.setError("formError", { message: data.error }, { shouldFocus: true });
                } else if (!form.formState.errors.formError) {
                    form.reset({
                        id: payload.id,
                        name: payload.name,
                        domain: payload.domain
                    });
                }
            },
            onError: (error) => {
                form.setError("formError", { message: error.message }, { shouldFocus: true });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                {form.formState.errors.formError && <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to create an app</AlertTitle>
                    <AlertDescription>
                        <p>{form.formState.errors.formError.message}</p>
                    </AlertDescription>
                </Alert>}
                <div className="grid gap-6">
                    <div className="grid gap-3 hidden">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>App Id</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>App Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mobis" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Domain</FormLabel>
                                    <FormControl>
                                        <Input placeholder="mobis.com" {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-4 justify-between sm:justify-end">
                        <Button type="submit" className="w-30" disabled={updateAppMutation.isPending || !form.formState.isDirty}>
                            {updateAppMutation.isPending && <Loader2Icon className="animate-spin" />}
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}
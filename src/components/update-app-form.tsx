'use client';
import { AlertCircleIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Form } from "@/components/ui/form"
import { useUpdateApp } from "@/hooks/use-apps";
import FormInput from "./form-input";
import SubmitButton from "./submit-button";
import { App } from "@/lib/types";

const FormSchema = z.object({
    id: z.string().min(1, { message: "Id is required" }),
    name: z.string().min(1, { message: "App name is required" }),
    domain: z.string().min(1, { message: "Domain is required" }),
    logoUrl: z.union([z.string().url(), z.string().length(0)]).optional(),
    imageUrl: z.union([z.string().url(), z.string().length(0)]).optional(),
    formError: z.string().optional(),
});


export function UpdateAppForm({
    className,
    app,
    onSuccess
}: { className?: string, app: App, onSuccess?: () => void }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: app.$id,
            name: app.name,
            domain: app.$id,
            logoUrl: app.prefs?.logoUrl || '',
            imageUrl: app.prefs?.imageUrl || ''
        },
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
                        domain: payload.domain,
                        logoUrl: payload.logoUrl,
                        imageUrl: payload.imageUrl,
                    });
                }
                onSuccess?.();
            },
            onError: (error) => {
                form.setError("formError", { message: error.message }, { shouldFocus: true });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {form.formState.errors.formError && <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to create an app</AlertTitle>
                    <AlertDescription>
                        <p>{form.formState.errors.formError.message}</p>
                    </AlertDescription>
                </Alert>}
                <FormInput name="id" label="App Id" control={form.control} disabled className="hidden" />
                <FormInput name="domain" label="Domain" control={form.control} disabled />
                <FormInput name="name" label="App Name" control={form.control} />
                <FormInput name="logoUrl" label="Logo URL" control={form.control} />
                <FormInput name="imageUrl" label="Image URL" control={form.control} />
                <div className="flex gap-4 justify-between sm:justify-end">
                    <SubmitButton
                        disabled={updateAppMutation.isPending || !form.formState.isDirty}
                        loading={updateAppMutation.isPending}
                        label="Update"
                        className="w-40"
                    />
                </div>
            </form>
        </Form >
    )
}
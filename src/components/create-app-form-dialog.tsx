'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { AlertCircleIcon, Loader2Icon, PlusIcon } from "lucide-react";
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
import { useState } from "react";
import { useCreateApp } from "@/hooks/use-apps";

const FormSchema = z.object({
    name: z.string().min(1, { message: "App name is required" }),
    domain: z.string().min(1, { message: "Domain is required" }),
    formError: z.string().optional(),
});

export function CreateAppFormDialog({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { name: "", domain: "" },
    });
    const [open, setOpen] = useState(false);
    const createAppMutation = useCreateApp();

    async function onSubmit(payload: z.infer<typeof FormSchema>) {
        createAppMutation.mutate(payload, {
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
                    setOpen(false);
                    form.reset();
                }
            },
            onError: (error) => {
                form.setError("formError", { message: error.message }, { shouldFocus: true });
            }
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button type="submit" className="w-30" >
                    <PlusIcon />
                    Create App
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Create new app</AlertDialogTitle>
                <AlertDialogDescription>
                    Please provide the necessary information to create a new app.
                </AlertDialogDescription>
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
                                                <Input placeholder="mobis.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-4 justify-between sm:justify-end">
                                <Button type="button" variant="secondary" className="w-30" onClick={() => { setOpen(false) }}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-30" disabled={createAppMutation.isPending || !form.formState.isDirty}>
                                    {createAppMutation.isPending && <Loader2Icon className="animate-spin" />}
                                    Create
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
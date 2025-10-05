'use client';
import { applyFormErrors, hasFormErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormError from "./form-error";
import FormInput from "./form-input";
import SubmitButton from "./submit-button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRestDelete } from "@/hooks/use-rest";

const DeleteFormSchema = z.object({
    delete: z.string().refine((val) => val === "delete", {
        message: "You must type 'delete'"
    }),
    formError: z.string().optional(),
});

export function DeleteForm({
    resourceUrl,
    onDelete,
    className,
    classNameButton
}: {
    resourceUrl: string;
    onDelete?: () => void;
    className?: string;
    classNameButton?: string
}) {
    const deleteForm = useForm<z.infer<typeof DeleteFormSchema>>({
        resolver: zodResolver(DeleteFormSchema),
        defaultValues: { delete: "" },
    });
    const useAppDelete = useRestDelete(resourceUrl);

    async function onSubmitDelete() {
        useAppDelete.mutate(undefined, {
            onError: (error) => {
                deleteForm.setError("formError", { message: error.message }, { shouldFocus: true });
            },
            onSuccess: (data) => {
                if (hasFormErrors(data)) {
                    applyFormErrors(deleteForm, data);
                } else {
                    onDelete?.();
                }
            }
        });
    }

    return (
        <Form {...deleteForm}>
            <form onSubmit={deleteForm.handleSubmit(onSubmitDelete)} className={`flex flex-col gap-6 ${className ?? ''}`}>
                <FormError
                    hide={!deleteForm.formState.errors.formError}
                    title="Unable to delete"
                    description={deleteForm.formState?.errors?.formError?.message}
                />
                <FormInput
                    name="delete"
                    label="Type 'delete'"
                    control={deleteForm.control}
                    className="w-full"
                />
                <SubmitButton
                    label="Delete"
                    loading={deleteForm.formState.isSubmitting}
                    disabled={deleteForm.formState.isSubmitting}
                    className={`bg-red-600 text-white hover:bg-red-700 ${classNameButton ?? ''}`}
                />
            </form>
        </Form >
    )
}

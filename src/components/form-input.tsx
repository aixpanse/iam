import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export default function FormInput<T extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    disabled,
    type,
    className
}: {
    name: Path<T>;
    label: string;
    placeholder?: string;
    control: Control<T>;
    disabled?: boolean;
    type?: string;
    className?: string;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} placeholder={placeholder} {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
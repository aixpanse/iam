import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function SubmitButton({
    label,
    loading,
    disabled,
    className
}: {
    label: string,
    loading: boolean,
    disabled?: boolean,
    className?: string
}) {
    return (
        <Button type="submit" className={`w-full ${className}`} disabled={disabled}>
            {loading && <Loader2Icon className="animate-spin" />}
            {label}
        </Button>
    );
}

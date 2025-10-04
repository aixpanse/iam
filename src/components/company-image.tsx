"use client";
import { useRest } from "@/hooks/use-rest";
import { App } from "@/lib/types";
import { useRedirectUrl } from "@/hooks/use-redirect-url";
import { AspectRatio } from "./ui/aspect-ratio";

export default function CompanyImage() {
    const { appId } = useRedirectUrl('iam.sites.aixpanse.pl');
    const { resource, isLoading } = useRest<App>(`/api/dashboard/apps/${appId}`);
    const imageUrl = resource?.prefs?.imageUrl || '/iam.jpg';

    if (isLoading) {
        return <SkeletonImage />;
    }

    return (
        <img
            src={imageUrl}
            alt="Image"
            className="absolute inset-0 h-full w-full object-c dark:brightness-[0.2] dark:grayscale"
        />
    );
}

export function SkeletonImage() {
    return (
        <div className="width-full height-full bg-muted">
        </div>
    );
}

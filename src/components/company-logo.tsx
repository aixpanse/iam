"use client";
import { useRest } from "@/hooks/use-rest";
import { GalleryVerticalEnd } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { App } from "@/lib/types";
import { useRedirectUrl } from "@/hooks/use-redirect-url";
import Link from "next/link";

export default function CompanyLogo() {
    const { appId, redirectUrl } = useRedirectUrl('iam.sites.aixpanse.pl');
    const { resource, isLoading } = useRest<App>(`/api/dashboard/apps/${appId}`);
    const logoUrl = resource?.data?.prefs?.logoUrl;
    const name = resource?.data?.name || 'IAM';

    if (isLoading) {
        return <SkeletonLogo />;
    }

    return (
        <Link href={redirectUrl} className="flex items-center gap-2 font-medium hover:underline">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                {
                    logoUrl ?
                        <img src={logoUrl} alt={name || 'IAM'} className="rounded-md" /> :
                        <GalleryVerticalEnd className="size-4" />
                }
            </div>
            {name || 'IAM'}
        </Link>
    );
}

export function SkeletonLogo() {
    return (
        <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-7 rounded-xl" />
            <Skeleton className="w-25 h-5 rounded-xl" />
        </div>
    );
}

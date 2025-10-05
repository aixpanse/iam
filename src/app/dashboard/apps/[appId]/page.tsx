'use client';
import { use, useState } from "react";
import { Card } from "@/components/ui/card";
import { UpdateAppForm } from "@/components/update-app-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRest } from "@/hooks/use-rest";
import { App } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { DeleteForm } from "@/components/delete-resource-form";

export default function DashboardAppPage({ params }: { params: Promise<{ appId: string }> }) {
    const appId = use(params).appId;
    const iframeSrc = `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin?redirectUrl=https://${appId}`;
    const { resource: app, isLoading } = useRest<App>(`/api/dashboard/apps/${appId}`);
    const router = useRouter();
    const [iframeUrl, setIframeUrl] = useState<string>(iframeSrc);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center m-4">
                <Loader2Icon className="animate-spin" />
            </div>
        );
    }

    if (!app?.data) {
        return <div className="text-center m-4">App not found</div>;
    }

    const refreshIframe = () => {
        setIframeUrl('#');
        setTimeout(() => setIframeUrl(iframeSrc), 100);
    }

    return (
        <div className="container mx-auto">
            <Button
                onClick={() => router.back()}
                variant="outline"
                className="mx-4 mt-4"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                </svg>
            </Button>
            <Card className="p-4 m-4">
                <UpdateAppForm app={app.data} onSuccess={refreshIframe} />
            </Card>
            <Card className="p-4 m-4">
                <div>
                    <div className="text-sm font-medium mb-1">Preview</div>
                    <iframe
                        src={iframeUrl}
                        className="w-full rounded"
                        title="App Preview"
                        style={{ zoom: '0.6', height: '600px', overflow: 'hidden', border: 'solid', borderColor: 'lightgray', borderWidth: '2px', borderRadius: '8px' }}
                    />
                </div>
            </Card>
            <Card className="p-4 m-4">
                <DeleteForm resourceUrl={`/api/dashboard/apps/${appId}`} onDelete={() => router.push('/dashboard/apps')}
                    className="items-end"
                    classNameButton="w-40" />
            </Card>
        </div >
    );
}
'use client';
import { use, useState } from "react";
import { Card } from "@/components/ui/card";
import { UpdateAppForm } from "@/components/update-app-form";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRest } from "@/hooks/use-rest";
import { App, User } from "@/lib/types";
import { Loader2Icon } from "lucide-react";

export default function DashboardAppPage({ params }: { params: Promise<{ appId: string }> }) {
    const appId = use(params).appId;
    const { resource: app, isLoading } = useRest<App>(`/api/dashboard/apps/${appId}`);
    const { resource: users, isLoading: isUsersLoading, error: usersError } = useRest<User[]>(`/api/dashboard/apps/${appId}/users`);
    const router = useRouter();
    const [iframeUrl, setIframeUrl] = useState<string>(`${process.env.NEXT_PUBLIC_APP_URL}/auth/signin?redirectUrl=https://${appId}`);

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
                <UpdateAppForm app={app.data} onSuccess={() => {
                    setIframeUrl('#');
                    setTimeout(() => {
                        setIframeUrl(`${process.env.NEXT_PUBLIC_APP_URL}/auth/signin?redirectUrl=https://${app.data?.prefs?.redirectUrl}`);
                    }, 100);
                }} />
            </Card>
            <Card className="p-4 m-4">
                <div className="text-sm font-mediu ">Preview</div>
                <iframe
                    src={iframeUrl}
                    className="w-full rounded"
                    title="App Preview"
                    style={{ zoom: '0.6', height: '600px', overflow: 'hidden', border: 'solid', borderColor: 'lightgray', borderWidth: '2px', borderRadius: '8px' }}
                />
            </Card>
            <Card className="py-2 px-4 m-4">
                <Table>
                    <TableCaption>A list of app users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isUsersLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Loading users...
                                </TableCell>
                            </TableRow>
                        ) : usersError ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-red-500">
                                    Error loading users
                                </TableCell>
                            </TableRow>
                        ) : users?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users?.data?.map(user => (
                                <TableRow key={user?.$id}>
                                    <TableCell>{user?.$id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div >
    );
}
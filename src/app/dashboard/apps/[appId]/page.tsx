'use client';
import { use } from "react";
import { Card } from "@/components/ui/card";
import { UpdateAppForm } from "@/components/update-app-form";
import { useApps } from "@/hooks/use-apps";
import { useUsers } from "@/hooks/use-users";
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

export default function DashboardAppPage({ params }: { params: Promise<{ appId: string }> }) {
    const { data, isLoading } = useApps();
    const resolvedParams = use(params);
    const router = useRouter();

    // Fetch users using the custom hook
    const {
        data: users = [],
        isLoading: isUsersLoading,
        error: usersError
    } = useUsers(resolvedParams.appId);

    const app = data?.find((app) => app.id === resolvedParams.appId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!app) {
        return <div>App not found</div>;
    }

    return (
        <div className="container mx-auto">
            <Button
                onClick={() => router.back()}
                variant="outline"
                className="mx-4"
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
                <UpdateAppForm app={app} />
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
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
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
'use client';
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CreateAppFormDialog } from "@/components/create-app-form-dialog";
import { useRouter } from "next/navigation";
import { useRest } from "@/hooks/use-rest";
import { App } from "@/lib/types";

export default function DashboardAppsPage() {
    const { resource: apps, isLoading, error } = useRest<App[]>("/api/dashboard/apps");
    const router = useRouter();

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-red-500 text-center">
                    Error loading apps: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <div className="flex justify-end">
                <CreateAppFormDialog />
            </div>
            <Card className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead >Id</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Loading apps...
                                </TableCell>
                            </TableRow>
                        ) : apps?.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No apps found
                                </TableCell>
                            </TableRow>
                        ) : (
                            apps?.data.map(app => (
                                <TableRow key={app.$id} onClick={() => router.push(`/dashboard/apps/${app.$id}`)}>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.$id}</TableCell>
                                    <TableCell>{app.$id}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
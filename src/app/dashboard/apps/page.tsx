'use client';
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CreateAppFormDialog } from "@/components/create-app-form-dialog";
import { useApps } from "@/hooks/use-apps";
import { useRouter } from "next/navigation";

export default function DashboardAppsPage() {
    const { data: apps = [], isLoading, error } = useApps();
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
            <Card className="py-2">
                <Table>
                    <TableCaption>A list of your apps.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Domain</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Loading apps...
                                </TableCell>
                            </TableRow>
                        ) : apps.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No apps found
                                </TableCell>
                            </TableRow>
                        ) : (
                            apps.map(app => (
                                <TableRow key={app.id} onClick={() => router.push(`/dashboard/apps/${app.id}`)}>
                                    <TableCell>{app.id}</TableCell>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.domain}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
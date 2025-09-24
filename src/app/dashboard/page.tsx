'use client';
import { ChartAreaDefault } from "@/components/chart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [users, setUsers] = useState<Models.User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/dashboard/users');
                const data = await response.json();
                setUsers(data.users ?? []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
                <ChartAreaDefault />
                <ChartAreaDefault />
                <ChartAreaDefault />
            </div>
            <div className="p-4">
                <Card className="py-2">
                    <Table>
                        <TableCaption>A list of your users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Verified</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.$id}>
                                    <TableCell>{user.$id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.emailVerification ? "secondary" : "destructive"}
                                        >
                                            {user?.emailVerification ? <BadgeCheckIcon /> : <BadgeAlertIcon />}
                                            {user?.emailVerification ? "Verified" : "Unverified"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </>
    )
}
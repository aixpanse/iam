'use client';
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function LogoutButton() {
    async function logOut() {
        const res = await fetch("/api/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId: 'current' }),
        });
        redirect('/')
    }

    return (
        <div>
            <Button onClick={logOut}>Logout</Button>
        </div>
    );
}
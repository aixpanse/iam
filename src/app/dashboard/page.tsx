'use client';
import { ChartAreaDefault } from "@/components/chart";

export default function DashboardPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
                <ChartAreaDefault />
                <ChartAreaDefault />
                <ChartAreaDefault />
            </div>
        </>
    )
}
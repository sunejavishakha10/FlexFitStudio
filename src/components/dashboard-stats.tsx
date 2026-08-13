"use client";

import { trpc } from "@/lib/trpc";

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
    return (
        <div className="panel p-4 space-y-1">
            <p className="text-sm muted">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs muted">{subtitle}</p>}
        </div>
    );
}

export function DashboardStats() {
    const { data: user } = trpc.auth.me.useQuery();
    const { data: myBookings } = (trpc as any).bookings?.myBookings?.useQuery();

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
                title="Available Credits"
                value={`${(user as any)?.credits ?? 0}`}
            />
            <StatCard
                title="Active Bookings"
                value={`${myBookings?.length ?? 0}`}
            />
            <StatCard
                title="Membership Status"
                value={user ? "Active" : "None"}
            />
        </div>
    );
}
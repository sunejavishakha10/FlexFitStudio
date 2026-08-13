"use client";

import { trpc } from "@/lib/trpc";
import { StatCard } from "@/components/dashboard-stats";

export default function DashboardPage() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: myBookings, isLoading } = trpc.bookings.mine.useQuery();

  if (isLoading) return <p className="muted">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">User Dashboard</h1>
        <p className="muted mt-1 text-sm">Manage your class bookings and credits.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Available Credits" value={`${(user as any)?.credits ?? 0}`} />
        <StatCard title="Active Bookings" value={`${myBookings?.length ?? 0}`} />
        <StatCard title="Membership Status" value={user ? "Active" : "None"} />
      </div>
    </div>
  );
}
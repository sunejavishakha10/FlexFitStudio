"use client";

import { trpc } from "@/lib/trpc";
import { PlanCard } from "@/components/plan-card";

export default function PlansPage() {
  const utils = trpc.useUtils();
  const { data: user } = trpc.auth.me.useQuery();
  const { data: plans, isLoading } = trpc.plans.list.useQuery();

  const subscribe = (trpc as any).memberships?.subscribe.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
    },
  });

  if (isLoading) return <p className="muted">Loading membership plans...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Membership Plans</h1>
        <p className="muted mt-1 text-sm">Choose the right plan for your routine.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans?.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            user={user}
            isPending={subscribe.isPending}
            onSubscribe={(planId) => subscribe.mutate({ planId })}
          />
        ))}
      </div>

      {!user && <p className="muted text-sm">Sign in to purchase a plan.</p>}
    </div>
  );
}
interface PlanCardProps {
  plan: any;
  user: any;
  isPending: boolean;
  onSubscribe: (planId: string) => void;
}

export function PlanCard({ plan, user, isPending, onSubscribe }: PlanCardProps) {
  return (
    <div key={plan.id} className="panel space-y-4 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{plan.name}</h2>
          <p className="muted text-sm">{plan.credits} credits / month</p>
        </div>
        <p className="text-xl font-bold">₹{plan.price}</p>
      </div>
      <p className="muted text-sm">{plan.description}</p>
      <button
        className="btn btn-primary w-full"
        disabled={!user || isPending}
        onClick={() => onSubscribe(plan.id)}
      >
        Select Plan
      </button>
    </div>
  );
}
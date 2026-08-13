import Link from "next/link";

export function HeroSection() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight">
        FlexFit Studio
      </h1>
      <p className="muted max-w-xl">
        Book classes, manage your membership, and track your attendance.
        Twelve classes a week across yoga, strength, spin and boxing.
      </p>
      <div className="flex gap-3 pt-2">
        <Link href="/schedule" className="btn btn-primary">
          View schedule
        </Link>
        <Link href="/plans" className="btn">
          Membership plans
        </Link>
      </div>
    </section>
  );
}
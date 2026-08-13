"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ClassCard } from "@/components/class-card";
import { RescheduleModal } from "@/components/reschedule-modal";

export default function SchedulePage() {
  const { data: schedule, isLoading } = trpc.classes.list.useQuery();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Fallback demo data with exact matching structure
  const displaySchedule = (schedule && schedule.length > 0) ? schedule : [
    {
      id: "demo-1",
      name: "Morning Flow Yoga",
      trainer: "Sarah Jenkins",
      time: "08:00 AM - 09:00 AM",
      spotsLeft: 5,
    },
    {
      id: "demo-2",
      name: "HIIT & Strength",
      trainer: "Alex Rivera",
      time: "10:30 AM - 11:30 AM",
      spotsLeft: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Class Schedule</h1>
        <p className="muted mt-1 text-sm">Browse and book upcoming fitness sessions.</p>
      </div>

      {isLoading && !schedule ? (
        <p className="muted text-sm">Syncing latest schedule...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displaySchedule.map((item: any) => (
            <ClassCard
              key={item.id}
              c={item}
              onReschedule={(classItem) => setSelectedBooking(classItem)}
            />
          ))}
        </div>
      )}

      {selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
interface ClassCardProps {
  c?: any;
  classItem?: any;
  onReschedule?: (item: any) => void;
}

export function ClassCard({ c, classItem, onReschedule }: ClassCardProps) {
  // Gracefully handle either prop name format
  const item = c || classItem || {};

  return (
    <div className="panel space-y-3 p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">{item.name || "Untitled Class"}</h2>
            {item.full && (
              <span className="rounded px-1.5 py-0.5 text-xs style={{ background: '#3a2' }}">
                Full
              </span>
            )}
          </div>
          <p className="muted text-sm">{item.trainer || item.instructor || "Instructor TBD"}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs muted">
        <span>{item.time || item.schedule || "Time TBD"}</span>
        {item.spotsLeft !== undefined && <span>{item.spotsLeft} spots left</span>}
      </div>
      {onReschedule && (
        <button className="btn btn-secondary w-full text-xs" onClick={() => onReschedule(item)}>
          Reschedule
        </button>
      )}
    </div>
  );
}
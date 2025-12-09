// src/components/ConsistencyIndicator.tsx
type ConsistencyIndicatorProps = {
  daysLoggedLast7: number;
};

export default function ConsistencyIndicator({
  daysLoggedLast7,
}: ConsistencyIndicatorProps) {
  const clamped = Math.min(Math.max(daysLoggedLast7, 0), 7);
  const percentage = Math.round((clamped / 7) * 100);

  let message = 'Start logging today to begin your streak.';
  if (clamped >= 5) {
    message = 'Great streak! You’ve logged on most days this week.';
  } else if (clamped >= 3) {
    message = 'Nice work — you’re starting to build a logging habit.';
  } else if (clamped >= 1) {
    message = 'Good start. Aim for another day or two this week.';
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-semibold">
        {clamped}/7
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 mb-0.5">
          Consistency
        </p>
        <p className="text-xs text-slate-600 mb-0.5">
          Logged {clamped} of the last 7 days ({percentage}%).
        </p>
        <p className="text-xs text-slate-500">{message}</p>
      </div>
    </div>
  );
}

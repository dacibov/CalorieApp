// src/components/ShareCardPreview.tsx
type ShareCardPreviewProps = {
  currentWeightKg: number | null;
  goalWeightKg: number | null;
  daysLoggedLast30: number;
};

export default function ShareCardPreview({
  currentWeightKg,
  goalWeightKg,
  daysLoggedLast30,
}: ShareCardPreviewProps) {
  const weightLine =
    currentWeightKg && goalWeightKg
      ? `${currentWeightKg.toFixed(1)} kg → ${goalWeightKg.toFixed(1)} kg`
      : 'Weight goal not set yet';

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-white">
      <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">
        MealFlash • Progress card
      </p>
      <p className="text-sm font-semibold mb-1">{weightLine}</p>
      <p className="text-xs text-slate-300 mb-3">
        Logged {daysLoggedLast30} of the last 30 days.
      </p>
      <div className="flex justify-between text-[11px] text-slate-300">
        <span>Built from your real logging streak</span>
        <span>Shareable image coming soon</span>
      </div>
    </div>
  );
}

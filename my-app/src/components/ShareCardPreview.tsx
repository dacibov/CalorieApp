import React from 'react';

interface ShareCardPreviewProps {
  currentWeightKg?: number | null;
  goalWeightKg?: number | null;
  daysLoggedLast30: number;
}

export default function ShareCardPreview({
  currentWeightKg,
  goalWeightKg,
  daysLoggedLast30,
}: ShareCardPreviewProps) {
  return (
    <div className="rounded-2xl bg-slate-900 text-slate-50 p-5 shadow-lg">
      <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
        MealFlash Progress
      </p>
      <p className="text-lg font-semibold mb-4">Month snapshot</p>

      <div className="space-y-2 text-sm">
        <p>
          <span className="text-slate-400">Current: </span>
          {currentWeightKg != null ? `${currentWeightKg.toFixed(1)} kg` : '—'}
        </p>
        <p>
          <span className="text-slate-400">Goal: </span>
          {goalWeightKg != null ? `${goalWeightKg.toFixed(1)} kg` : '—'}
        </p>
        <p>
          <span className="text-slate-400">Logged days (30d): </span>
          {daysLoggedLast30}
        </p>
      </div>

      <p className="mt-4 text-[11px] text-slate-400">
        In a future build, this card will be exportable as an image for sharing.
        For now, this preview helps design the layout.
      </p>
    </div>
  );
}

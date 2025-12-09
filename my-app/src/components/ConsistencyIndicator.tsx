import React from 'react';

interface ConsistencyIndicatorProps {
  daysLoggedLast7: number;
}

export default function ConsistencyIndicator({ daysLoggedLast7 }: ConsistencyIndicatorProps) {
  const clamped = Math.max(0, Math.min(7, daysLoggedLast7));

  return (
    <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
      <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
        Consistency
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">
        {clamped} of last 7 days logged
      </p>
      <p className="mt-1 text-xs text-slate-600">
        Every logged day is a rep. Even a few days per week builds momentum.
      </p>
    </div>
  );
}

import React from 'react';

interface WeeklyCheckInOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  daysLogged: number;
  avgCalories: number;
}

export default function WeeklyCheckInOverlay({
  isOpen,
  onClose,
  daysLogged,
  avgCalories,
}: WeeklyCheckInOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Weekly check-in
        </h2>
        <p className="text-sm text-slate-700 mb-4">
          Quick pulse-check on your last 7 days.
        </p>

        <div className="space-y-2 mb-4">
          <p className="text-sm">
            <span className="font-semibold">Days logged:</span> {daysLogged} / 7
          </p>
          <p className="text-sm">
            <span className="font-semibold">Average intake:</span>{' '}
            {Math.round(avgCalories)} kcal/day
          </p>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          You’re learning how your real life and your goals fit together. What’s
          one tiny tweak you want to carry into next week?
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-slate-900 text-white py-2 text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

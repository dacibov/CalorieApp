// src/components/WeeklyCheckInOverlay.tsx
type WeeklyCheckInOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  daysLogged: number;
  avgCalories: number;
};

export default function WeeklyCheckInOverlay({
  isOpen,
  onClose,
  daysLogged,
  avgCalories,
}: WeeklyCheckInOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Weekly check-in
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Here&apos;s a quick snapshot of your last 7 days.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500 mb-1">Days logged</p>
            <p className="text-base font-semibold text-slate-900">
              {daysLogged} / 7
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500 mb-1">Avg intake</p>
            <p className="text-base font-semibold text-slate-900">
              {Math.round(avgCalories)} kcal
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          We&apos;ll use these trends to gently adjust your calorie goal over
          time — never punitive, always supportive.
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Got it, keep logging
        </button>
      </div>
    </div>
  );
}

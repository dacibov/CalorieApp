// src/components/Dashboard.tsx
export default function Dashboard() {
  const today = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6 font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">MealFlash</h1>
        <p className="text-slate-600 text-sm">
          {today.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Fake Progress Ring */}
      <div className="flex items-center gap-4 mb-6">
        <svg width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#0f172a"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={(2 * Math.PI * 50) * 0.4}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fill="#0f172a"
          >
            60%
          </text>
        </svg>

        <div>
          <p className="text-sm text-slate-600">Today&apos;s calories</p>
          <p className="text-2xl font-semibold text-slate-900">
            1200 / 2000 kcal
          </p>
        </div>
      </div>

      {/* Goal assistant */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 mb-6">
        <p className="text-xs uppercase text-slate-500 mb-1">Goal assistant</p>
        <p className="text-sm text-slate-700">
          You're hovering close to your weekly target — small improvements add up.
        </p>
      </div>

      {/* Consistency */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 mb-6">
        <p className="text-sm font-semibold">Consistency</p>
        <p className="text-xs text-slate-600">Logged 3 of the last 7 days.</p>
      </div>

      {/* Mock meal logging button */}
      <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition mb-8">
        Log a meal (mock)
      </button>

      {/* Share card preview */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white">
        <p className="text-xs uppercase tracking-wide text-slate-300 mb-1">
          Shareable progress card
        </p>
        <p className="text-sm font-semibold mb-2">Weight goal not set yet</p>
        <p className="text-xs text-slate-300 mb-3">
          Logged 12 of the last 30 days.
        </p>
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Your consistency builds results</span>
          <span>Share image coming soon</span>
        </div>
      </div>
    </div>
  );
}

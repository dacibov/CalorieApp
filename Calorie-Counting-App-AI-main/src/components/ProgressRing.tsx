// src/components/ProgressRing.tsx
type ProgressRingProps = {
  calories: number;
  goalCalories: number;
};

export default function ProgressRing({ calories, goalCalories }: ProgressRingProps) {
  const clampedGoal = goalCalories > 0 ? goalCalories : 1;
  const ratio = Math.min(calories / clampedGoal, 1);
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ratio);

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="shrink-0">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#0f172a"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.4s ease-out' }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="16"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          {Math.round(ratio * 100)}%
        </text>
      </svg>

      <div>
        <p className="text-sm text-slate-600 mb-1">Today&apos;s calories</p>
        <p className="text-2xl font-semibold text-slate-900">
          {Math.round(calories)} / {goalCalories} kcal
        </p>
        <p className="text-xs text-slate-500 mt-1">
          This ring fills as you log meals throughout the day.
        </p>
      </div>
    </div>
  );
}

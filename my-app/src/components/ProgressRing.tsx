import React from 'react';

interface ProgressRingProps {
  calories: number;
  goalCalories: number;
}

const RADIUS = 60;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ calories, goalCalories }: ProgressRingProps) {
  const safeGoal = goalCalories || 1;
  const rawProgress = calories / safeGoal;
  const clamped = Math.max(0, Math.min(1, rawProgress));
  const strokeDashoffset = CIRCUMFERENCE - CIRCUMFERENCE * clamped;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <svg width={(RADIUS + STROKE) * 2} height={(RADIUS + STROKE) * 2}>
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={STROKE}
            r={RADIUS}
            cx={RADIUS + STROKE}
            cy={RADIUS + STROKE}
          />
          <circle
            stroke={clamped >= 1 ? '#FB923C' : '#22C55E'}
            fill="transparent"
            strokeWidth={STROKE}
            strokeLinecap="round"
            r={RADIUS}
            cx={RADIUS + STROKE}
            cy={RADIUS + STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${RADIUS + STROKE} ${RADIUS + STROKE})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-slate-500">Today</p>
          <p className="text-xl font-semibold text-slate-900">
            {Math.round(calories)} kcal
          </p>
          <p className="text-xs text-slate-500">
            Goal {Math.round(goalCalories)} kcal
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700">
            {Math.round(clamped * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}


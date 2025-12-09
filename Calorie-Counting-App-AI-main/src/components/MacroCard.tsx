interface MacroCardProps {
  label: string;
  value: number;
  unit: string;
  goal: number;
  color: string;
}

export default function MacroCard({ label, value, unit, goal, color }: MacroCardProps) {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div className={`${color} border-2 rounded-lg p-4`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-slate-900 text-sm">{label}</h3>
        <span className="text-xs text-slate-600">Goal: {goal}</span>
      </div>
      <div className="mb-2">
        <p className="text-2xl font-bold text-slate-900">{Math.round(value)}<span className="text-sm font-normal text-slate-600 ml-1">{unit}</span></p>
      </div>
      <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-slate-700 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{Math.round(percentage)}% of goal</p>
    </div>
  );
}

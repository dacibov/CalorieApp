import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { MealLog } from '../types';
import { dbQueries } from '../lib/db';

interface MealLogListProps {
  refreshKey: number;
}

export default function MealLogList({ refreshKey }: MealLogListProps) {
  const [meals, setMeals] = useState<(MealLog & { food: any })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadMeals = async () => {
      try {
        setIsLoading(true);
        const mealLogs = await dbQueries.getMealLogsForDate(today);
        setMeals(mealLogs);
      } catch (error) {
        console.error('Failed to load meals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeals();
  }, [today, refreshKey]);

  const handleDelete = async (id: string) => {
    try {
      await dbQueries.deleteMealLog(id);
      setMeals(meals.filter(m => m.id !== id));
    } catch (error) {
      console.error('Failed to delete meal:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">No meals logged yet. Add your first meal!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <div key={meal.id} className="bg-white rounded-lg p-4 border border-slate-200 flex justify-between items-start hover:shadow-md transition-shadow">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{meal.food?.name || 'Unknown Food'}</h3>
            <p className="text-sm text-slate-600 mt-1">
              {Math.round(meal.food?.calories * (meal.quantity || 1))} kcal
              {meal.quantity > 1 && ` (${meal.quantity}x)`}
            </p>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span>P: {Math.round(meal.food?.protein_g * (meal.quantity || 1))}g</span>
              <span>C: {Math.round(meal.food?.carbs_g * (meal.quantity || 1))}g</span>
              <span>F: {Math.round(meal.food?.fat_g * (meal.quantity || 1))}g</span>
            </div>
          </div>
          <button
            onClick={() => handleDelete(meal.id)}
            className="text-slate-400 hover:text-red-500 transition-colors ml-4 flex-shrink-0"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

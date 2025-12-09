import { create } from 'zustand';

export type Meal = {
  id: string;
  timestamp: number; // ms since epoch
  totalCalories: number;
};

export type MealsState = {
  meals: Meal[];
  addMeal: (totalCalories: number, timestamp?: number) => void;
  addMealForDate: (totalCalories: number, date: Date) => void;
  getMealsForDay: (date: Date) => Meal[];
  getLoggedDaysCount: (daysBack: number) => number;
  copyYesterday: () => void;
};

export const useMealsStore = create<MealsState>((set, get) => ({
  meals: [],

  // Normal "log now" meal
  addMeal: (totalCalories, timestamp = Date.now()) =>
    set((state) => ({
      meals: [
        ...state.meals,
        {
          id: `${timestamp}-${state.meals.length + 1}`,
          timestamp,
          totalCalories,
        },
      ],
    })),

  // Log a meal for an arbitrary calendar day (used by date navigation / quick-add)
  addMealForDate: (totalCalories, date) =>
    set((state) => {
      const d = new Date(date);
      // Set to midday to avoid timezone edges when comparing by date
      d.setHours(12, 0, 0, 0);
      const timestamp = d.getTime();

      return {
        meals: [
          ...state.meals,
          {
            id: `${timestamp}-${state.meals.length + 1}`,
            timestamp,
            totalCalories,
          },
        ],
      };
    }),

  getMealsForDay: (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return get().meals.filter(
      (meal) =>
        meal.timestamp >= start.getTime() && meal.timestamp < end.getTime()
    );
  },

  getLoggedDaysCount: (daysBack: number) => {
    const { meals } = get();
    const today = new Date();

    let count = 0;

    for (let i = 0; i < daysBack; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const hasMealThatDay = meals.some((meal) => {
        const md = new Date(meal.timestamp);
        return (
          md.getFullYear() === d.getFullYear() &&
          md.getMonth() === d.getMonth() &&
          md.getDate() === d.getDate()
        );
      });

      if (hasMealThatDay) count++;
    }

    return count;
  },

  copyYesterday: () => {
    const { meals } = get();

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const start = new Date(yesterday);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const yMeals = meals.filter(
      (meal) =>
        meal.timestamp >= start.getTime() && meal.timestamp < end.getTime()
    );

    if (yMeals.length === 0) return;

    const now = Date.now();

    set((state) => ({
      meals: [
        ...state.meals,
        ...yMeals.map((meal, index) => ({
          id: `${now}-${state.meals.length + index + 1}`,
          timestamp: now,
          totalCalories: meal.totalCalories,
        })),
      ],
    }));
  },
}));

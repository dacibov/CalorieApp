import { useEffect, useMemo, useState } from 'react';
import { useMealsStore } from '../state/meals';
import { useGoalsStore } from '../state/goals';

export type WeeklyCheckInState = {
  visible: boolean;
  daysLoggedThisWeek: number;
  avgIntakeThisWeek: number;
  targetCalories: number;
  goalDateLabel: string;
  summaryMessage: string;
  dismiss: () => void;
};

export function useWeeklyCheckIn(): WeeklyCheckInState {
  const meals = useMealsStore((state) => state.meals);
  const getLoggedDaysCount = useMealsStore(
    (state) => state.getLoggedDaysCount
  );

  const dailyCaloriesTarget = useGoalsStore(
    (state) => state.dailyCaloriesTarget
  );
  const goalDateLabel = useGoalsStore(
    (state) => state.predictedGoalDateLabel
  );

  const [visible, setVisible] = useState(false);
  const [hasEverShown, setHasEverShown] = useState(false);

  // Compute stats for last 7 days
  const { daysLoggedThisWeek, avgIntakeThisWeek } = useMemo(() => {
    const today = new Date();
    let totalCalories = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const dayMeals = meals.filter((meal) => {
        const md = new Date(meal.timestamp);
        return (
          md.getFullYear() === d.getFullYear() &&
          md.getMonth() === d.getMonth() &&
          md.getDate() === d.getDate()
        );
      });

      totalCalories += dayMeals.reduce(
        (sum, meal) => sum + meal.totalCalories,
        0
      );
    }

    const daysLogged = getLoggedDaysCount(7);
    const avgIntake =
      daysLogged > 0 ? Math.round(totalCalories / daysLogged) : 0;

    return {
      daysLoggedThisWeek: daysLogged,
      avgIntakeThisWeek: avgIntake,
    };
  }, [meals, getLoggedDaysCount]);

  // Decide when to show: once per session, only if they’ve logged a bit
  useEffect(() => {
    if (!hasEverShown && daysLoggedThisWeek >= 3) {
      setVisible(true);
      setHasEverShown(true);
    }
  }, [hasEverShown, daysLoggedThisWeek]);

  // Summary message based on intake vs target
  let summaryMessage = 'Start logging meals to see your weekly picture.';

  if (daysLoggedThisWeek >= 1 && dailyCaloriesTarget > 0) {
    const ratio = avgIntakeThisWeek / dailyCaloriesTarget;

    if (ratio < 0.9) {
      summaryMessage = `You’re trending ahead of schedule. Keep doing what you’re doing.`;
    } else if (ratio > 1.1) {
      summaryMessage = `You slipped a bit, but you’re only a few consistent days of logging away from being back on track.`;
    } else {
      summaryMessage = `You’re on track — stay consistent and you’ll hit your goal.`;
    }
  }

  return {
    visible,
    daysLoggedThisWeek,
    avgIntakeThisWeek,
    targetCalories: dailyCaloriesTarget,
    goalDateLabel,
    summaryMessage,
    dismiss: () => setVisible(false),
  };
}

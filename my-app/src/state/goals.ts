import { create } from 'zustand';
import { mockPredictGoalDate } from '../services/predictions';

export type GoalsState = {
  // for now: fixed example target
  targetWeightKg: number;
  dailyCaloriesTarget: number;

  predictedGoalDateLabel: string;
  statusMessage: string;

  updateTodayIntake: (todaysCalories: number) => void;
};

function initialPrediction(targetWeightKg: number, dailyCaloriesTarget: number) {
  // treat “on-target” intake as baseline
  return mockPredictGoalDate(dailyCaloriesTarget, dailyCaloriesTarget, targetWeightKg);
}

export const useGoalsStore = create<GoalsState>((set, get) => {
  const targetWeightKg = 72;
  const dailyCaloriesTarget = 1800;

  const initial = initialPrediction(targetWeightKg, dailyCaloriesTarget);

  return {
    targetWeightKg,
    dailyCaloriesTarget,
    predictedGoalDateLabel: initial.predictedGoalDateLabel,
    statusMessage: initial.coachingMessage,

    updateTodayIntake: (todaysCalories: number) => {
      const { dailyCaloriesTarget, targetWeightKg } = get();
      const prediction = mockPredictGoalDate(
        todaysCalories,
        dailyCaloriesTarget,
        targetWeightKg
      );

      set({
        predictedGoalDateLabel: prediction.predictedGoalDateLabel,
        statusMessage: prediction.coachingMessage,
      });
    },
  };
});

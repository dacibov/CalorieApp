export type PredictionStatus = 'on_track' | 'ahead' | 'behind';

export type PredictionResult = {
  status: PredictionStatus;
  predictedGoalDateLabel: string; // e.g. "Mar 12"
  coachingMessage: string;
};

function formatFutureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function mockPredictGoalDate(
  todaysCalories: number,
  targetCalories: number,
  targetWeightKg: number
): PredictionResult {
  if (targetCalories <= 0) targetCalories = 1;

  const ratio = todaysCalories / targetCalories;
  let status: PredictionStatus;
  let daysOffset: number;

  if (ratio < 0.9) {
    status = 'ahead';
    daysOffset = 75;
  } else if (ratio > 1.1) {
    status = 'behind';
    daysOffset = 110;
  } else {
    status = 'on_track';
    daysOffset = 90;
  }

  const dateLabel = formatFutureDate(daysOffset);

  let coachingMessage: string;

  if (status === 'ahead') {
    coachingMessage = `You’re trending ahead of schedule. We’ll keep things steady – on track to hit ${targetWeightKg} kg by ${dateLabel}.`;
  } else if (status === 'behind') {
    coachingMessage = `Life happens. Based on recent days, we’re now projecting ${targetWeightKg} kg by ${dateLabel}. You can keep it gentle, or turn things up a bit.`;
  } else {
    coachingMessage = `You’re on track to hit ${targetWeightKg} kg by ${dateLabel}. Keep doing what you’re doing.`;
  }

  return {
    status,
    predictedGoalDateLabel: dateLabel,
    coachingMessage,
  };
}

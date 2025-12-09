export type AnalyzedFoodItem = {
  name: string;
  calories: number;
};

export async function analyzeMealImage(
  photoUri: string
): Promise<AnalyzedFoodItem[]> {
  // placeholder mock AI – will be replaced with real model call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { name: 'Grilled chicken', calories: 240 },
    { name: 'Rice', calories: 200 },
  ];
}

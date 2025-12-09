export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  source: 'database' | 'barcode' | 'ai';
  barcode?: string;
  created_at: string;
}

export interface MealLog {
  id: string;
  session_id: string;
  food_id: string;
  quantity: number;
  date: string;
  created_at: string;
  food?: FoodItem;
}

export interface DailySummary {
  id: string;
  session_id: string;
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  created_at: string;
}

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

import { supabase, getSessionId } from './supabase';
import { FoodItem, MealLog, DailySummary } from '../types';

export const dbQueries = {
  async searchFoods(query: string): Promise<FoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(20);

    if (error) throw error;
    return data || [];
  },

  async getFoodByBarcode(barcode: string): Promise<FoodItem | null> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('barcode', barcode)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getFoodById(id: string): Promise<FoodItem | null> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async addMealLog(foodId: string, quantity: number = 1, date: string = new Date().toISOString().split('T')[0]): Promise<MealLog> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('meal_logs')
      .insert([{
        session_id: sessionId,
        food_id: foodId,
        quantity,
        date,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteMealLog(id: string): Promise<void> {
    const { error } = await supabase
      .from('meal_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getMealLogsForDate(date: string): Promise<(MealLog & { food: FoodItem })[]> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('meal_logs')
      .select('*, food:food_id(*)')
      .eq('session_id', sessionId)
      .eq('date', date)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getDailySummary(date: string): Promise<DailySummary | null> {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('session_id', sessionId)
      .eq('date', date)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

    async getDailySummariesLastNDays(n: number): Promise<DailySummary[]> {
    const sessionId = getSessionId();

    const today = new Date();
    const endDate = today.toISOString().split('T')[0];

    const start = new Date();
    start.setDate(start.getDate() - (n - 1));
    const startDate = start.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('session_id', sessionId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async calculateAndSaveDailySummary(date: string): Promise<DailySummary> {
    const sessionId = getSessionId();
    const meals = await this.getMealLogsForDate(date);

    const totals = {
      total_calories: 0,
      total_protein: 0,
      total_carbs: 0,
      total_fat: 0,
    };

    meals.forEach((meal) => {
      const factor = meal.quantity || 1;
      totals.total_calories += meal.food.calories * factor;
      totals.total_protein += meal.food.protein_g * factor;
      totals.total_carbs += meal.food.carbs_g * factor;
      totals.total_fat += meal.food.fat_g * factor;
    });

    const { data, error } = await supabase
      .from('daily_summaries')
      .upsert([{
        session_id: sessionId,
        date,
        ...totals,
      }], { onConflict: 'session_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addFoodItem(food: Omit<FoodItem, 'id' | 'created_at'>): Promise<FoodItem> {
    const { data, error } = await supabase
      .from('food_items')
      .insert([food])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

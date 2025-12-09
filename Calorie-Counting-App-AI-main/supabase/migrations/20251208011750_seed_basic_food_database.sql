/*
  # Seed basic food database

  1. Data
    - Insert 20 common foods with nutrition data
    - Mix of meals, snacks, and ingredients
    - Source: 'database' for all initial items
    - Nutrition data based on USDA FoodData Central (per 100g or serving)
*/

INSERT INTO food_items (name, calories, protein_g, carbs_g, fat_g, source) VALUES
('Chicken Breast (100g)', 165, 31, 0, 3.6, 'database'),
('Brown Rice (100g cooked)', 111, 2.6, 23, 0.9, 'database'),
('Broccoli (100g)', 34, 2.8, 7, 0.4, 'database'),
('Banana (medium, 118g)', 105, 1.3, 27, 0.3, 'database'),
('Almonds (30g)', 164, 6, 6, 14, 'database'),
('Eggs (1 large)', 72, 6.3, 0.4, 5, 'database'),
('Greek Yogurt (100g)', 59, 10, 3.3, 0.4, 'database'),
('Whole Wheat Bread (1 slice, 28g)', 80, 4, 14, 1, 'database'),
('Oats (40g dry)', 150, 5, 27, 3, 'database'),
('Salmon (100g)', 206, 22, 0, 13, 'database'),
('Apple (medium, 182g)', 95, 0.5, 25, 0.3, 'database'),
('Orange (medium, 154g)', 62, 1.2, 15.4, 0.3, 'database'),
('Pizza Slice (1 slice)', 250, 12, 28, 10, 'database'),
('Hamburger (standard)', 354, 15, 28, 19, 'database'),
('Pasta (100g cooked)', 131, 5, 25, 1.1, 'database'),
('Tuna (100g canned in water)', 96, 22, 0, 0.8, 'database'),
('Olive Oil (1 tbsp, 15ml)', 120, 0, 0, 14, 'database'),
('Granola Bar (1 bar, 35g)', 140, 3, 20, 5, 'database'),
('Protein Bar (1 bar, 45g)', 180, 20, 15, 5, 'database'),
('Milk (1 cup, 240ml)', 149, 8, 12, 8, 'database')
ON CONFLICT (name) DO NOTHING;

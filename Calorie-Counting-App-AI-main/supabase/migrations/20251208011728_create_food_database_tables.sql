/*
  # Create food tracking database schema

  1. New Tables
    - `food_items` - Base food database with nutrition info
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `calories` (integer)
      - `protein_g` (numeric, grams)
      - `carbs_g` (numeric, grams)
      - `fat_g` (numeric, grams)
      - `source` (text: 'database' | 'barcode' | 'ai')
      - `barcode` (text, optional unique barcode number)
      - `created_at` (timestamp)
    
    - `meal_logs` - User food entries (local tracking)
      - `id` (uuid, primary key)
      - `session_id` (text, local session identifier)
      - `food_id` (uuid, foreign key to food_items)
      - `quantity` (numeric, portion size)
      - `date` (date)
      - `created_at` (timestamp)
    
    - `daily_summaries` - Cached daily nutrition totals
      - `id` (uuid, primary key)
      - `session_id` (text)
      - `date` (date)
      - `total_calories` (integer)
      - `total_protein` (numeric)
      - `total_carbs` (numeric)
      - `total_fat` (numeric)
      - `created_at` (timestamp)

  2. Security
    - RLS disabled for now (local tracking, no authentication)
    - Can enable RLS when user auth is added

  3. Indexes
    - Barcode lookup index for fast scanning
    - Date-based queries for daily summaries
*/

CREATE TABLE IF NOT EXISTS food_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  calories integer NOT NULL,
  protein_g numeric NOT NULL DEFAULT 0,
  carbs_g numeric NOT NULL DEFAULT 0,
  fat_g numeric NOT NULL DEFAULT 0,
  source text NOT NULL DEFAULT 'database' CHECK (source IN ('database', 'barcode', 'ai')),
  barcode text UNIQUE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS meal_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  food_id uuid NOT NULL REFERENCES food_items(id) ON DELETE CASCADE,
  quantity numeric NOT NULL DEFAULT 1,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  date date NOT NULL,
  total_calories integer DEFAULT 0,
  total_protein numeric DEFAULT 0,
  total_carbs numeric DEFAULT 0,
  total_fat numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, date)
);

CREATE INDEX IF NOT EXISTS idx_food_items_barcode ON food_items(barcode);
CREATE INDEX IF NOT EXISTS idx_meal_logs_date ON meal_logs(date);
CREATE INDEX IF NOT EXISTS idx_meal_logs_session_date ON meal_logs(session_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_summaries_session_date ON daily_summaries(session_id, date);

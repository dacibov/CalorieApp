// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Read env from Vite if present; fall back to dummy values
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

// In a real setup, you will replace these with your real Supabase project URL and anon key.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple per-browser session ID helper, used later by db.ts
const SESSION_STORAGE_KEY = 'mealflash_session_id';

export function getSessionId(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'server';
  }

  let id = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id =
      Math.random().toString(36).slice(2) +
      Date.now().toString(36).slice(2);
    window.localStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
}

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { FoodItem } from '../types';
import { dbQueries } from '../lib/db';

interface FoodSearchProps {
  onFoodAdded: () => void;
}

export default function FoodSearch({ onFoodAdded }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const foods = await dbQueries.searchFoods(query);
      setResults(foods);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFood = async (food: FoodItem) => {
    try {
      setIsAdding(true);
      await dbQueries.addMealLog(food.id, quantity);
      setSelectedFood(null);
      setQuery('');
      setResults([]);
      setQuantity(1);
      onFoodAdded();
    } catch (error) {
      console.error('Failed to add meal:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (selectedFood) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedFood(null)}
          className="text-sm text-slate-600 hover:text-slate-900 font-semibold"
        >
          ← Back
        </button>

        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-slate-900 text-lg">{selectedFood.name}</h3>
          <p className="text-slate-600 text-sm mt-1">Calories per serving</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs text-slate-600">Protein</p>
            <p className="text-lg font-bold text-slate-900">{selectedFood.protein_g}g</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-slate-600">Carbs</p>
            <p className="text-lg font-bold text-slate-900">{selectedFood.carbs_g}g</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-slate-600">Fat</p>
            <p className="text-lg font-bold text-slate-900">{selectedFood.fat_g}g</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-xs text-slate-600">Calories</p>
            <p className="text-lg font-bold text-slate-900">{selectedFood.calories}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Quantity</label>
          <div className="flex gap-2">
            <button
              onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
              min="0.5"
              step="0.5"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
            <button
              onClick={() => setQuantity(quantity + 0.5)}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              +
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Total: {Math.round(selectedFood.calories * quantity)} kcal
          </p>
        </div>

        <button
          onClick={() => handleAddFood(selectedFood)}
          disabled={isAdding}
          className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add to Log'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search foods..."
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <Search size={18} />
        </button>
      </form>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {isLoading && <p className="text-center text-slate-600 py-4">Searching...</p>}
        {!isLoading && results.length === 0 && query && (
          <p className="text-center text-slate-600 py-4">No foods found</p>
        )}
        {results.map((food) => (
          <button
            key={food.id}
            onClick={() => setSelectedFood(food)}
            className="w-full text-left p-3 border border-slate-200 rounded-lg hover:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-900">{food.name}</p>
                <p className="text-xs text-slate-600 mt-1">{food.calories} cal • P:{food.protein_g}g C:{food.carbs_g}g F:{food.fat_g}g</p>
              </div>
              <Plus size={18} className="text-slate-400 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface BarcodeScannerProps {
  onFoodAdded: () => void;
}

export default function BarcodeScanner({ onFoodAdded }: BarcodeScannerProps) {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Coming soon! Barcode scanner will be built in step 1.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">Barcode</label>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter or scan barcode..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      {error && (
        <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
      >
        Lookup
      </button>
    </form>
  );
}

import { useState } from 'react';
import { X } from 'lucide-react';
import BarcodeScanner from './BarcodeScanner';
import FoodSearch from './FoodSearch';
import AIPhotoRecognition from './AIPhotoRecognition';

interface AddFoodModalProps {
  onClose: () => void;
  onFoodAdded: () => void;
}

export default function AddFoodModal({ onClose, onFoodAdded }: AddFoodModalProps) {
  const [activeTab, setActiveTab] = useState<'barcode' | 'search' | 'ai'>('search');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Add Food</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-1">
            {[
              { id: 'barcode', label: 'Scan' },
              { id: 'search', label: 'Search' },
              { id: 'ai', label: 'Photo' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-slate-700 text-slate-900'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {activeTab === 'barcode' && <BarcodeScanner onFoodAdded={onFoodAdded} />}
          {activeTab === 'search' && <FoodSearch onFoodAdded={onFoodAdded} />}
          {activeTab === 'ai' && <AIPhotoRecognition onFoodAdded={onFoodAdded} />}
        </div>
      </div>
    </div>
  );
}

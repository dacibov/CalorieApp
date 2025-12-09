import { useState } from 'react';
import { AlertCircle, Upload } from 'lucide-react';

interface AIPhotoRecognitionProps {
  onFoodAdded: () => void;
}

export default function AIPhotoRecognition({ onFoodAdded }: AIPhotoRecognitionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Coming soon! AI photo recognition will be built in step 4.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!preview ? (
        <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-slate-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload size={32} className="mx-auto text-slate-400 mb-2" />
          <p className="font-semibold text-slate-900">Upload a photo</p>
          <p className="text-sm text-slate-600">Click to select an image from your device</p>
        </label>
      ) : (
        <div>
          <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
            className="mt-2 text-sm text-slate-600 hover:text-slate-900 font-semibold"
          >
            ✕ Change photo
          </button>
        </div>
      )}

      {error && (
        <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!file}
        className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        Analyze Photo
      </button>
    </form>
  );
}

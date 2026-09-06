import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorState({
  title = 'Unable to load data',
  message = 'An error occurred while connecting to the server. Please try again.',
  onRetry
}) {
  return (
    <div className="p-6 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle size={24} />
      </div>
      <h4 className="text-base font-bold text-rose-950">{title}</h4>
      <p className="text-xs text-rose-700 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
        >
          <RotateCcw size={14} className="mr-1.5" />
          Retry Request
        </button>
      )}
    </div>
  );
}

import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />,
  error: <XCircle size={18} className="text-rose-600 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-600 shrink-0" />,
  info: <Info size={18} className="text-sky-600 shrink-0" />
};

const bgColors = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
  error: 'bg-rose-50 border-rose-200 text-rose-950',
  warning: 'bg-amber-50 border-amber-200 text-amber-950',
  info: 'bg-sky-50 border-sky-200 text-sky-950'
};

export default function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-center justify-between transition-all duration-300 transform translate-y-0 ${bgColors[t.type] || bgColors.info}`}
        >
          <div className="flex items-center space-x-3">
            {icons[t.type] || icons.info}
            <span className="text-sm font-semibold leading-tight">{t.message}</span>
          </div>
          <button
            onClick={() => onClose(t.id)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition ml-2"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

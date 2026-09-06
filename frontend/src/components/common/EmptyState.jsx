import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No data found',
  description = 'There are no records matching your request.',
  actionText,
  onAction
}) {
  return (
    <div className="text-center py-12 px-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
      <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
        <Icon size={28} />
      </div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">{description}</p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 inline-flex items-center px-4 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded-lg text-xs font-bold transition shadow-sm"
        >
          <Plus size={14} className="mr-1.5" />
          {actionText}
        </button>
      )}
    </div>
  );
}

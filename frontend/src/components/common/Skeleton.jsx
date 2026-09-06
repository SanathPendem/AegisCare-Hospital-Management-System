import React from 'react';

export function Skeleton({ className = 'h-4 w-full', style }) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="w-full space-y-3 p-4">
      <div className="flex space-x-4 mb-4">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-6 flex-1 bg-slate-200" />
        ))}
      </div>
      {[...Array(rows)].map((_, r) => (
        <div key={r} className="flex space-x-4 py-2 border-b border-slate-100">
          {[...Array(cols)].map((_, c) => (
            <Skeleton key={c} className="h-5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

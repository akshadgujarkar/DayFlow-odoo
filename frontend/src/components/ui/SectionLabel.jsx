import React from 'react';

export function SectionLabel({ children, className = '' }) {
  return (
    <div className={`mb-6 flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-border" />
      <span className="small-caps text-accent">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

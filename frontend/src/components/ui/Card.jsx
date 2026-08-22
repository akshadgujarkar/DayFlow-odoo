import React from 'react';

export function Card({ 
  children, 
  className = '', 
  hoverEffect = false,
  elevated = false,
  accentTop = false,
  ...props 
}) {
  return (
    <div 
      className={`bg-card rounded-lg border border-border p-8 ${elevated ? 'shadow-md' : 'shadow-sm'} ${accentTop ? 'border-t-2 border-t-accent' : ''} ${hoverEffect ? 'transition-all duration-200 hover:shadow-md hover:border-border-hover hover:bg-muted/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

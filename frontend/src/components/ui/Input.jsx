import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-12 w-full rounded-md border border-border bg-transparent px-4 py-2 text-base text-foreground transition-all duration-150 ease-out placeholder:text-muted-foreground/60 hover:border-border-hover focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});
Input.displayName = 'Input';

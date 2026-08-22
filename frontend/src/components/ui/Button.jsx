import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-md touch-manipulation min-h-[44px] px-6 text-sm tracking-[0.05em]";
  
  const variants = {
    primary: "bg-accent text-accent-foreground shadow-sm hover:bg-accent-secondary hover:shadow-accent hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-transparent border border-foreground text-foreground hover:bg-muted hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:underline decoration-accent underline-offset-4"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

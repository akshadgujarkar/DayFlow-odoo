import React from 'react';
import { Button } from '../../components/ui/Button';

export function Systray() {
  return (
    <div className="bg-card border-b border-border py-2 px-6 flex justify-end items-center gap-4 text-sm z-40 relative shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent"></span>
        <span className="text-muted-foreground small-caps text-[10px]">Pending Check-in</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex gap-2">
        <Button variant="secondary" className="min-h-[28px] h-7 px-3 py-1 text-xs">
          Check In
        </Button>
        <Button variant="ghost" className="min-h-[28px] h-7 px-3 py-1 text-xs opacity-50 cursor-not-allowed">
          Check Out
        </Button>
      </div>
    </div>
  );
}

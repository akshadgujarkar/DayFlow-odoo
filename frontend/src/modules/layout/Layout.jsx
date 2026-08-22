import React from 'react';
import { Outlet } from 'react-router-dom';
import { Systray } from './Systray';
import { TopNav } from './TopNav';

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Systray />
      <TopNav />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Outlet />
      </main>
    </div>
  );
}

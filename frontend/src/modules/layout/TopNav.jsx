import React from 'react';
import { NavLink } from 'react-router-dom';
import { AvatarDropdown } from '../../components/ui/AvatarDropdown';

export function TopNav() {
  const navItems = [
    { name: 'Employees', path: '/' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Time Off', path: '/timeoff' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo placeholder */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-accent tracking-wide">
                DayFlow
              </span>
            </div>
            
            {/* Nav Links */}
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                    ${isActive 
                      ? 'border-accent text-foreground' 
                      : 'border-transparent text-muted-foreground hover:border-border-hover hover:text-foreground'
                    }
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center">
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

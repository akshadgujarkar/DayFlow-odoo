import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Systray } from './Systray';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Employees', path: '/' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Time Off', path: '/timeoff' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Systray />
      
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-12">
              <Link to="/" className="text-2xl font-bold font-serif text-foreground tracking-tight">
                DayFlow
              </Link>
              
              <nav className="hidden md:flex gap-8">
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full p-1 -m-1"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-foreground leading-tight">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="small-caps text-[10px] text-muted-foreground">
                    {user?.role}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-serif font-bold hover:border-accent transition-colors">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-md py-2 z-40">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Outlet />
      </main>
    </div>
  );
}

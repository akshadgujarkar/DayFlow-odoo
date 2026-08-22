import React from 'react';
import { Card } from '../../components/ui/Card';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { useAuth } from '../../context/AuthContext';

export function DashboardStub() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-16">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
          Welcome back, {user?.first_name}.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          This is the Employees Dashboard placeholder. In Phase 4, you will see the employee card grid and live status here.
        </p>
      </div>
      
      <div>
        <SectionLabel>Overview</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect accentTop>
            <h3 className="text-xl font-serif font-semibold mb-2">Total Employees</h3>
            <p className="text-4xl font-serif text-accent">24</p>
          </Card>
          <Card hoverEffect>
            <h3 className="text-xl font-serif font-semibold mb-2">On Leave Today</h3>
            <p className="text-4xl font-serif text-accent">2</p>
          </Card>
          <Card hoverEffect>
            <h3 className="text-xl font-serif font-semibold mb-2">Pending Requests</h3>
            <p className="text-4xl font-serif text-accent">5</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

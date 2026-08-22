import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { SectionLabel } from '../../components/ui/SectionLabel';

export function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only for Phase 3
    alert('Employees cannot self-register. Please contact HR to create your account.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">DayFlow</h1>
          <p className="mt-2 text-muted-foreground">Register your company</p>
        </div>
        
        <Card elevated accentTop className="mt-8">
          <SectionLabel>Registration</SectionLabel>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                <Input placeholder="John" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                <Input placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
              <Input placeholder="Acme Corp" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Work Email</label>
              <Input type="email" placeholder="john@acmecorp.com" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <Input type="password" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                <Input type="password" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Company Logo</label>
              <Input type="file" accept="image/*" />
            </div>
            
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-accent hover:text-accent-secondary font-medium">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

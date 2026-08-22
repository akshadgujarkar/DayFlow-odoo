import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function EmployeeCard({ employee, isClickable }) {
  const navigate = useNavigate();
  
  return (
    <Card 
      hoverEffect={isClickable} 
      className={`flex flex-col h-full ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={() => isClickable && navigate(`/profile/${employee.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-serif text-lg font-bold">
          {employee.first_name?.[0]}{employee.last_name?.[0]}
        </div>
        <Badge status={employee.status} />
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-serif font-semibold text-foreground truncate">
          {employee.first_name} {employee.last_name}
        </h3>
        <p className="text-sm text-muted-foreground small-caps mt-1">
          {employee.job_position || 'Employee'}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{employee.department || 'General'}</span>
        <span className="text-accent font-mono text-xs">{employee.login_id}</span>
      </div>
    </Card>
  );
}

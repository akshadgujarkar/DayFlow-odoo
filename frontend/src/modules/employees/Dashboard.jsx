import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEmployees } from '../../api/employeeApi';
import { EmployeeCard } from './EmployeeCard';
import { CreateEmployeeModal } from './CreateEmployeeModal';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export function Dashboard() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async (query = '', showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getEmployees(query);
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
      setError('Failed to load employees.');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const latestSearch = useRef(search);
  useEffect(() => {
    latestSearch.current = search;
  }, [search]);

  useEffect(() => {
    fetchEmployees(latestSearch.current, true);
    
    // Phase 9: Real-time Status Polling every 10 seconds
    const interval = setInterval(() => {
      fetchEmployees(latestSearch.current, false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees(search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleEmployeeCreated = (newEmp) => {
    setEmployees([newEmp, ...employees]);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2 leading-tight">
            Employees
          </h1>
          <p className="text-lg text-muted-foreground">
            Directory of all team members
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <Button onClick={() => setIsModalOpen(true)}>
            + Add New Employee
          </Button>
        )}
      </div>
      
      <div className="max-w-md">
        <Input 
          type="search" 
          placeholder="Search by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div>
        <SectionLabel>Team Members</SectionLabel>
        
        {loading ? (
          <div className="py-20 text-center font-serif text-muted-foreground animate-pulse text-xl">
            Loading directory...
          </div>
        ) : employees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employees.map(emp => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center font-serif text-muted-foreground text-xl">
            No employees found.
          </div>
        )}
      </div>

      {user?.role === 'admin' && (
        <CreateEmployeeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onCreated={handleEmployeeCreated}
        />
      )}
    </div>
  );
}

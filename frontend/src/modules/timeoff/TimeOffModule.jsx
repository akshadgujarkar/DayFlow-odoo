import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLeaveRequests, submitLeaveRequest, updateLeaveStatus } from '../../api/timeOffApi';
import { TimeOffTable } from './TimeOffTable';
import { LeaveRequestForm } from './LeaveRequestForm';
import { Button } from '../../components/ui/Button';

export function TimeOffModule() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getLeaveRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmitRequest = async (formData) => {
    try {
      await submitLeaveRequest(formData);
      setIsFormOpen(false);
      fetchRequests();
    } catch (error) {
      console.error('Failed to submit leave request:', error);
      alert(error.response?.data?.error?.message || 'Failed to submit request.');
    }
  };

  const handleApprove = async (id, admin_comment) => {
    try {
      await updateLeaveStatus(id, 'Approved', admin_comment);
      fetchRequests();
    } catch (error) {
      console.error('Failed to approve request:', error);
      alert('Failed to approve request.');
    }
  };

  const handleReject = async (id, admin_comment) => {
    try {
      await updateLeaveStatus(id, 'Rejected', admin_comment);
      fetchRequests();
    } catch (error) {
      console.error('Failed to reject request:', error);
      alert('Failed to reject request.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2 leading-tight">
            Time Off
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage leaves, holidays, and time-off requests
          </p>
        </div>
        
        <Button onClick={() => setIsFormOpen(true)}>
          + Apply for Leave
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center font-serif text-muted-foreground animate-pulse text-xl">
          Loading requests...
        </div>
      ) : (
        <TimeOffTable 
          requests={requests} 
          isAdmin={user?.role === 'admin'} 
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {isFormOpen && (
        <LeaveRequestForm 
          onSubmit={handleSubmitRequest} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}

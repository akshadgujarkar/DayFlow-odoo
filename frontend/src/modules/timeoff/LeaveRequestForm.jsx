import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export function LeaveRequestForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'Paid Time Off',
    start_date: '',
    end_date: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card elevated className="w-full max-w-md">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Leave Type</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              className="w-full h-12 rounded-md border border-border bg-transparent px-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              required
            >
              <option value="Paid Time Off">Paid Time Off</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Unpaid Leaves">Unpaid Leaves</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
            <Input 
              type="date" 
              name="start_date" 
              value={formData.start_date} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
            <Input 
              type="date" 
              name="end_date" 
              value={formData.end_date} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Remarks</label>
            <textarea 
              name="remarks"
              className="w-full min-h-[80px] rounded-md border border-border bg-transparent p-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Reason for leave..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

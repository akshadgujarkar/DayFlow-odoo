import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { createEmployee } from '../../api/employeeApi';

export function CreateEmployeeModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_joining: '',
    role: 'employee',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await createEmployee(formData);
      setSuccessData(result);
      if (onCreated) onCreated(result.employee);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSuccessData(null);
    setFormData({
      first_name: '', last_name: '', email: '', date_of_joining: '', role: 'employee'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Employee">
      {successData ? (
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-green-200">
            ✓
          </div>
          <div>
            <h3 className="text-2xl font-serif text-foreground">Employee Created!</h3>
            <p className="text-muted-foreground mt-2">Please share these credentials securely. The password cannot be recovered later.</p>
          </div>
          
          <div className="bg-muted p-6 rounded-md border border-border text-left space-y-3">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="small-caps text-muted-foreground">Login ID:</span> 
              <span className="font-mono font-medium text-accent">{successData.credentials.login_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="small-caps text-muted-foreground">Password:</span> 
              <span className="font-mono font-medium text-accent">{successData.credentials.password}</span>
            </div>
          </div>
          
          <Button onClick={handleClose} className="w-full">Done</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-200">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
              <Input name="first_name" required value={formData.first_name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
              <Input name="last_name" required value={formData.last_name} onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Date of Joining</label>
              <Input type="date" name="date_of_joining" required value={formData.date_of_joining} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Role</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="flex h-12 w-full rounded-md border border-border bg-transparent px-4 py-2 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Employee'}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

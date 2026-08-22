import React, { useEffect, useState } from 'react';
import { getSalaryInfo, updateSalaryInfo } from '../../api/employeeApi';
import { Button } from '../../components/ui/Button';

export function SalaryInfoTab({ employeeId, isAdmin }) {
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    wage_type: 'Fixed wage',
    wage_amount: 0,
    working_days_per_week: 5
  });

  const fetchSalary = async () => {
    setLoading(true);
    try {
      // Get for current month/year to see payable days
      const date = new Date();
      const data = await getSalaryInfo(employeeId, date.getFullYear(), date.getMonth() + 1);
      setSalaryData(data);
      setFormData({
        wage_type: data.wage_type || 'Fixed wage',
        wage_amount: data.wage_amount || 0,
        working_days_per_week: data.working_days_per_week || 5
      });
    } catch (e) {
      console.error('Failed to fetch salary data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalary();
  }, [employeeId]);

  const handleSave = async () => {
    try {
      const data = await updateSalaryInfo(employeeId, formData);
      setSalaryData(data);
      setIsEditing(false);
      // Re-fetch to get updated payable days if needed, but components are returned
      fetchSalary();
    } catch (e) {
      console.error('Failed to update salary info', e);
      alert('Failed to update salary info');
    }
  };

  if (loading) {
    return <div className="p-8 text-center animate-pulse font-serif">Loading salary info...</div>;
  }

  if (!salaryData) {
    return <div className="p-8 text-center text-muted-foreground font-serif">Unable to load salary info.</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-8 space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-foreground">Salary Information</h2>
        {!isEditing ? (
          isAdmin && <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit Configuration</Button>
        ) : (
          <div className="space-x-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* CONFIGURATION */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif text-muted-foreground border-b border-border pb-2">Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Wage Type</label>
              {isEditing ? (
                <select
                  value={formData.wage_type}
                  onChange={e => setFormData({...formData, wage_type: e.target.value})}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-ring focus:border-input"
                >
                  <option value="Fixed wage">Fixed wage</option>
                  <option value="Hourly wage">Hourly wage</option>
                </select>
              ) : (
                <p className="text-foreground">{salaryData.wage_type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Wage Amount</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.wage_amount}
                  onChange={e => setFormData({...formData, wage_amount: e.target.value})}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-ring focus:border-input"
                />
              ) : (
                <p className="text-foreground">₹{parseFloat(salaryData.wage_amount).toLocaleString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Working Days per Week</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.working_days_per_week}
                  onChange={e => setFormData({...formData, working_days_per_week: e.target.value})}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-ring focus:border-input"
                />
              ) : (
                <p className="text-foreground">{salaryData.working_days_per_week}</p>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Payable Days (Current Month)</label>
              <p className="text-foreground font-mono text-lg">{salaryData.payable_days || 0}</p>
              <p className="text-xs text-muted-foreground">Based on Attendance and Approved Time Off</p>
            </div>
          </div>
        </div>

        {/* COMPUTED COMPONENTS */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif text-muted-foreground border-b border-border pb-2">Computed Components</h3>
          
          <div className="bg-muted p-6 rounded-lg space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Basic Salary (50%)</span>
              <span className="text-foreground">₹{salaryData.basic_salary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">House Rent Allowance (50% of Basic)</span>
              <span className="text-foreground">₹{salaryData.hra}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standard Allowance (Fixed)</span>
              <span className="text-foreground">₹{salaryData.standard_allowance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Performance Bonus (8.33% of Basic)</span>
              <span className="text-foreground">₹{salaryData.performance_bonus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leave Travel Allowance (8.33% of Basic)</span>
              <span className="text-foreground">₹{salaryData.leave_travel_allowance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fixed Allowance</span>
              <span className="text-foreground">₹{salaryData.fixed_allowance}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-bold">
              <span className="text-foreground">Gross Monthly Salary</span>
              <span className="text-foreground">₹{parseFloat(salaryData.wage_amount).toLocaleString()}</span>
            </div>
          </div>

          <h3 className="text-xl font-serif text-muted-foreground border-b border-border pb-2 mt-8">Deductions</h3>
          <div className="bg-muted p-6 rounded-lg space-y-3 font-mono text-sm">
             <div className="flex justify-between">
              <span className="text-muted-foreground">Professional Tax</span>
              <span className="text-foreground text-destructive">-₹{salaryData.professional_tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provident Fund (Employee - 12% of Basic)</span>
              <span className="text-foreground text-destructive">-₹{salaryData.pf_employee_contribution}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-bold">
              <span className="text-foreground">Total Deductions</span>
              <span className="text-destructive">-₹{(parseFloat(salaryData.professional_tax) + parseFloat(salaryData.pf_employee_contribution)).toFixed(2)}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between text-lg text-accent font-bold">
              <span>Net Monthly Wage</span>
              <span>₹{(parseFloat(salaryData.wage_amount) - parseFloat(salaryData.professional_tax) - parseFloat(salaryData.pf_employee_contribution)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

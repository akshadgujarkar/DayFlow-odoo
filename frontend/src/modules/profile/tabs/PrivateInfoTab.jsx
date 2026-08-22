import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function PrivateInfoTab({ employee, isEditable, isSelf, isAdmin, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    personal_email: employee.personal_email || '',
    mobile: employee.mobile || '',
    gender: employee.gender || '',
    marital_status: employee.marital_status || '',
    nationality: employee.nationality || '',
    residing_address: employee.residing_address || '',
    bank_name: employee.bank_name || '',
    account_number: employee.account_number || '',
    ifsc_code: employee.ifsc_code || '',
  });
  const [loading, setLoading] = useState(false);

  if (!isSelf && !isAdmin) {
    return (
      <div className="py-20 text-center text-muted-foreground font-serif text-xl">
        This information is private and hidden.
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    await onSave(formData);
    setIsEditing(false);
    setLoading(false);
  };

  const Field = ({ label, name, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {isEditing ? (
        <Input type={type} name={name} value={formData[name]} onChange={handleChange} />
      ) : (
        <div className="h-12 border border-transparent flex items-center text-foreground">
          {employee[name] || '-'}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-serif text-foreground">Private Information</h3>
        {isEditable && !isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit Info</Button>
        )}
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Field label="Personal Email" name="personal_email" type="email" />
          <Field label="Mobile" name="mobile" />
          <Field label="Gender" name="gender" />
          <Field label="Marital Status" name="marital_status" />
          <Field label="Nationality" name="nationality" />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Residing Address</label>
            {isEditing ? (
              <textarea 
                name="residing_address"
                className="w-full min-h-[80px] rounded-md border border-border bg-transparent p-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={formData.residing_address}
                onChange={handleChange}
              />
            ) : (
              <div className="border border-transparent text-foreground pt-2">
                {employee.residing_address || '-'}
              </div>
            )}
          </div>

          <div className="md:col-span-2 mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground small-caps mb-4">Bank Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Bank Name" name="bank_name" />
              <Field label="Account Number" name="account_number" />
              <Field label="IFSC Code" name="ifsc_code" />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

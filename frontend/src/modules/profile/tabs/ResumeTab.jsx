import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function ResumeTab({ employee, isEditable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    about: employee.about || '',
    job_love_text: employee.job_love_text || '',
    hobbies_text: employee.hobbies_text || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(formData);
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-serif text-foreground">Resume & About</h3>
        {isEditable && !isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit Resume</Button>
        )}
      </div>

      <Card>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground small-caps mb-3">About Me</h4>
            {isEditing ? (
              <textarea 
                className="w-full min-h-[120px] rounded-md border border-border bg-transparent p-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={formData.about}
                onChange={e => setFormData({...formData, about: e.target.value})}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{employee.about || 'No information provided.'}</p>
            )}
          </div>

          <div className="h-px bg-border w-full" />

          <div>
            <h4 className="text-sm font-medium text-muted-foreground small-caps mb-3">What I Love About My Job</h4>
            {isEditing ? (
              <textarea 
                className="w-full min-h-[80px] rounded-md border border-border bg-transparent p-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={formData.job_love_text}
                onChange={e => setFormData({...formData, job_love_text: e.target.value})}
              />
            ) : (
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{employee.job_love_text || 'No information provided.'}</p>
            )}
          </div>

          <div className="h-px bg-border w-full" />

          <div>
            <h4 className="text-sm font-medium text-muted-foreground small-caps mb-3">Hobbies & Interests</h4>
            {isEditing ? (
              <textarea 
                className="w-full min-h-[80px] rounded-md border border-border bg-transparent p-4 text-base focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={formData.hobbies_text}
                onChange={e => setFormData({...formData, hobbies_text: e.target.value})}
              />
            ) : (
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{employee.hobbies_text || 'No information provided.'}</p>
            )}
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

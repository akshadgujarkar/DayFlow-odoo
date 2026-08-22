import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export function SkillsAndCertsTab({ employee, isEditable, onAddSkill, onDeleteSkill, onAddCert, onDeleteCert }) {
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  
  const [addingSkill, setAddingSkill] = useState(false);
  const [addingCert, setAddingCert] = useState(false);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    setAddingSkill(true);
    await onAddSkill(skillInput.trim());
    setSkillInput('');
    setAddingSkill(false);
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setAddingCert(true);
    await onAddCert(certInput.trim());
    setCertInput('');
    setAddingCert(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* SKILLS */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-foreground">Skills</h3>
        <Card className="h-full">
          <div className="flex flex-wrap gap-2 mb-6">
            {employee.skills?.map(skill => (
              <div key={skill.id} className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border text-sm">
                <span>{skill.skill_name}</span>
                {isEditable && (
                  <button 
                    onClick={() => onDeleteSkill(skill.id)}
                    className="ml-2 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {(!employee.skills || employee.skills.length === 0) && (
              <p className="text-muted-foreground text-sm">No skills added yet.</p>
            )}
          </div>
          
          {isEditable && (
            <form onSubmit={handleAddSkill} className="flex gap-2 mt-auto pt-6 border-t border-border">
              <Input 
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                placeholder="Add a skill..."
                className="flex-1"
              />
              <Button type="submit" disabled={addingSkill || !skillInput.trim()}>
                Add
              </Button>
            </form>
          )}
        </Card>
      </div>

      {/* CERTIFICATIONS */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-foreground">Certifications</h3>
        <Card className="h-full">
          <div className="space-y-3 mb-6">
            {employee.certifications?.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-3 rounded-md bg-muted border border-border">
                <span className="font-medium text-foreground">{cert.certification_name}</span>
                {isEditable && (
                  <button 
                    onClick={() => onDeleteCert(cert.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {(!employee.certifications || employee.certifications.length === 0) && (
              <p className="text-muted-foreground text-sm">No certifications added yet.</p>
            )}
          </div>
          
          {isEditable && (
            <form onSubmit={handleAddCert} className="flex gap-2 mt-auto pt-6 border-t border-border">
              <Input 
                value={certInput}
                onChange={e => setCertInput(e.target.value)}
                placeholder="Add a certification..."
                className="flex-1"
              />
              <Button type="submit" disabled={addingCert || !certInput.trim()}>
                Add
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

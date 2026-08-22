import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getEmployee, updateEmployee, addSkill, deleteSkill, addCertification, deleteCertification } from '../../api/employeeApi';
import { Tabs } from '../../components/ui/Tabs';
import { ResumeTab } from './tabs/ResumeTab';
import { PrivateInfoTab } from './tabs/PrivateInfoTab';
import { SkillsAndCertsTab } from './tabs/SkillsAndCertsTab';
import { SalaryInfoTab } from './SalaryInfoTab';
import { Badge } from '../../components/ui/Badge';

export function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getEmployee(id);
      setEmployee(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center font-serif text-muted-foreground animate-pulse text-xl">Loading profile...</div>;
  }

  if (!employee) {
    return <div className="py-20 text-center font-serif text-muted-foreground text-xl">Profile not found.</div>;
  }

  const isSelf = user.id === parseInt(id, 10);
  const isAdmin = user.role === 'admin';
  const isEditable = isSelf || isAdmin;

  const handleUpdate = async (updateData) => {
    try {
      const result = await updateEmployee(id, updateData);
      setEmployee({ ...employee, ...result.employee });
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  const handleAddSkill = async (name) => {
    try {
      const skill = await addSkill(id, name);
      setEmployee({ ...employee, skills: [...(employee.skills || []), skill] });
    } catch (e) { console.error(e); }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(id, skillId);
      setEmployee({ ...employee, skills: employee.skills.filter(s => s.id !== skillId) });
    } catch (e) { console.error(e); }
  };

  const handleAddCert = async (name) => {
    try {
      const cert = await addCertification(id, name);
      setEmployee({ ...employee, certifications: [...(employee.certifications || []), cert] });
    } catch (e) { console.error(e); }
  };

  const handleDeleteCert = async (certId) => {
    try {
      await deleteCertification(id, certId);
      setEmployee({ ...employee, certifications: employee.certifications.filter(c => c.id !== certId) });
    } catch (e) { console.error(e); }
  };

  const tabs = [
    { 
      label: 'Resume', 
      content: <ResumeTab employee={employee} isEditable={isEditable} onSave={handleUpdate} /> 
    },
    { 
      label: 'Private Information', 
      content: <PrivateInfoTab employee={employee} isEditable={isEditable} isSelf={isSelf} isAdmin={isAdmin} onSave={handleUpdate} /> 
    },
    { 
      label: 'Skills & Certifications', 
      content: <SkillsAndCertsTab 
                 employee={employee} 
                 isEditable={isEditable} 
                 onAddSkill={handleAddSkill}
                 onDeleteSkill={handleDeleteSkill}
                 onAddCert={handleAddCert}
                 onDeleteCert={handleDeleteCert}
               /> 
    }
  ];

  if (isAdmin) {
    tabs.push({
      label: 'Salary Info',
      content: <SalaryInfoTab employeeId={id} />
    });
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-card p-8 rounded-xl shadow-sm border border-border border-t-4 border-t-accent">
        <div className="w-24 h-24 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-serif text-4xl font-bold">
          {employee.first_name?.[0]}{employee.last_name?.[0]}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-1">
            <h1 className="text-3xl font-serif text-foreground">
              {employee.first_name} {employee.last_name}
            </h1>
            <Badge status="present" />
          </div>
          <p className="text-lg text-muted-foreground small-caps mb-4">
            {employee.job_position || 'Employee'} • {employee.department || 'General'}
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="font-mono text-accent">{employee.login_id}</span>
            </span>
            <span>{employee.email}</span>
            {employee.mobile && <span>{employee.mobile}</span>}
          </div>
        </div>
      </div>

      {/* TABS */}
      <Tabs tabs={tabs} />
    </div>
  );
}

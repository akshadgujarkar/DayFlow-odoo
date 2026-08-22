'use strict';

const sequelize = require('../config/database');

const Employee = require('./employee.model');
const Skill = require('./skill.model');
const Certification = require('./certification.model');
const SalaryProfile = require('./salaryProfile.model');
const AttendanceRecord = require('./attendanceRecord.model');
const TimeOffRequest = require('./timeOffRequest.model');
const LeaveAllocation = require('./leaveAllocation.model');

// Define associations

// Employee -> Skills (1:N)
Employee.hasMany(Skill, { foreignKey: 'employee_id', as: 'skills' });
Skill.belongsTo(Employee, { foreignKey: 'employee_id' });

// Employee -> Certifications (1:N)
Employee.hasMany(Certification, { foreignKey: 'employee_id', as: 'certifications' });
Certification.belongsTo(Employee, { foreignKey: 'employee_id' });

// Employee -> SalaryProfile (1:1)
Employee.hasOne(SalaryProfile, { foreignKey: 'employee_id', as: 'salaryProfile' });
SalaryProfile.belongsTo(Employee, { foreignKey: 'employee_id' });

// Employee -> AttendanceRecords (1:N)
Employee.hasMany(AttendanceRecord, { foreignKey: 'employee_id', as: 'attendanceRecords' });
AttendanceRecord.belongsTo(Employee, { foreignKey: 'employee_id' });

// Employee -> TimeOffRequests (1:N)
Employee.hasMany(TimeOffRequest, { foreignKey: 'employee_id', as: 'timeOffRequests' });
TimeOffRequest.belongsTo(Employee, { foreignKey: 'employee_id' });

// Employee -> LeaveAllocations (1:N)
Employee.hasMany(LeaveAllocation, { foreignKey: 'employee_id', as: 'leaveAllocations' });
LeaveAllocation.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = {
  sequelize,
  Employee,
  Skill,
  Certification,
  SalaryProfile,
  AttendanceRecord,
  TimeOffRequest,
  LeaveAllocation
};

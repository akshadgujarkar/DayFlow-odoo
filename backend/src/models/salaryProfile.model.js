'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalaryProfile = sequelize.define('SalaryProfile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  wage_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  wage_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  working_days_per_week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  basic_salary: {
    type: DataTypes.DECIMAL(12, 2),
  },
  hra: {
    type: DataTypes.DECIMAL(12, 2),
  },
  standard_allowance: {
    type: DataTypes.DECIMAL(12, 2),
  },
  performance_bonus: {
    type: DataTypes.DECIMAL(12, 2),
  },
  leave_travel_allowance: {
    type: DataTypes.DECIMAL(12, 2),
  },
  fixed_allowance: {
    type: DataTypes.DECIMAL(12, 2),
  },
  professional_tax: {
    type: DataTypes.DECIMAL(12, 2),
  },
  pf_employee_contribution: {
    type: DataTypes.DECIMAL(12, 2),
  },
  pf_employer_contribution: {
    type: DataTypes.DECIMAL(12, 2),
  },
}, {
  tableName: 'salary_profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SalaryProfile;

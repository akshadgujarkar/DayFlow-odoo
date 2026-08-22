'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LeaveAllocation = sequelize.define('LeaveAllocation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  allocated_days: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  remaining_days: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
}, {
  tableName: 'leave_allocations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = LeaveAllocation;

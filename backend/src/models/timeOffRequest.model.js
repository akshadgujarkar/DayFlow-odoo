'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TimeOffRequest = sequelize.define('TimeOffRequest', {
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
    type: DataTypes.ENUM('Paid Time Off', 'Sick Leave', 'Unpaid Leaves'),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  allocation_days: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  attachment_url: {
    type: DataTypes.STRING(255),
  },
  remarks: {
    type: DataTypes.TEXT,
  },
  admin_comment: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending',
  },
}, {
  tableName: 'time_off_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = TimeOffRequest;

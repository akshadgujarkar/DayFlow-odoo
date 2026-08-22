'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AttendanceRecord = sequelize.define('AttendanceRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  check_in_time: {
    type: DataTypes.DATE,
  },
  check_out_time: {
    type: DataTypes.DATE,
  },
  work_hours: {
    type: DataTypes.DECIMAL(5, 2),
  },
  extra_hours: {
    type: DataTypes.DECIMAL(5, 2),
  },
  break_time: {
    type: DataTypes.DECIMAL(5, 2),
  },
}, {
  tableName: 'attendance_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['employee_id', 'date']
    }
  ]
});

module.exports = AttendanceRecord;

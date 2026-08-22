'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  personal_email: {
    type: DataTypes.STRING(150),
  },
  mobile: {
    type: DataTypes.STRING(20),
  },
  company: {
    type: DataTypes.STRING(100),
  },
  department: {
    type: DataTypes.STRING(100),
  },
  manager: {
    type: DataTypes.STRING(100),
  },
  location: {
    type: DataTypes.STRING(100),
  },
  role: {
    type: DataTypes.ENUM('admin', 'employee'),
    allowNull: false,
    defaultValue: 'employee',
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.STRING(20),
  },
  nationality: {
    type: DataTypes.STRING(50),
  },
  marital_status: {
    type: DataTypes.STRING(20),
  },
  residing_address: {
    type: DataTypes.TEXT,
  },
  bank_name: {
    type: DataTypes.STRING(100),
  },
  account_number: {
    type: DataTypes.STRING(50),
  },
  ifsc_code: {
    type: DataTypes.STRING(20),
  },
  pan_no: {
    type: DataTypes.STRING(20),
  },
  uan_no: {
    type: DataTypes.STRING(20),
  },
  date_of_joining: {
    type: DataTypes.DATEONLY,
  },
  job_position: {
    type: DataTypes.STRING(100),
  },
  emp_code: {
    type: DataTypes.STRING(50),
  },
  about: {
    type: DataTypes.TEXT,
  },
  job_love_text: {
    type: DataTypes.TEXT,
  },
  hobbies_text: {
    type: DataTypes.TEXT,
  },
  profile_picture_url: {
    type: DataTypes.STRING(255),
  },
  company_logo_url: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'employees',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Employee;

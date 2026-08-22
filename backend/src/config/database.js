/**
 * config/database.js
 *
 * Sequelize connection configuration, reading values from environment variables.
 * Schema is designed in MySQL Workbench and exported as DDL (database/hrms_schema.sql).
 * Sequelize maps to that schema via models and migrations (Rules.md §7).
 *
 * Phase 1 TODO: Initialize Sequelize instance and test connection.
 */
'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'hrms_dev',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development'
      ? (msg) => console.log(`[Sequelize] ${msg}`) // eslint-disable-line no-console
      : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;

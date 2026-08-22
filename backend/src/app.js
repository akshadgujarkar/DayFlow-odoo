/**
 * app.js — Express application factory
 *
 * Configures middleware and mounts all route groups.
 * Does NOT call app.listen() — that's done in server.js so this module
 * can be imported cleanly by Supertest in tests.
 */
'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables early
dotenv.config();

const app = express();

// ── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({
  // Phase 3 TODO: restrict origin to the deployed frontend URL in production.
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
// Health-check (Phase 0 deliverable — GET /api/health → 200)
const healthRouter = require('./routes/health');
app.use('/api', healthRouter);

// Phase 2+: mount service routes here as they are implemented:
// const authRoutes = require('./routes/auth');
// const employeeRoutes = require('./routes/employees');
// const attendanceRoutes = require('./routes/attendance');
// const timeOffRoutes = require('./routes/timeoff');
// const payrollRoutes = require('./routes/payroll');
// const statusRoutes = require('./routes/status');
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/timeoff', timeOffRoutes);
// app.use('/api/status', statusRoutes);

// ── Global error handler ─────────────────────────────────────────────────────
// Rules.md §18–19: consistent error shape and correct HTTP status codes.
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;

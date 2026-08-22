/**
 * routes/health.js
 *
 * Phase 0 deliverable: GET /api/health
 * Returns 200 with a JSON body so that CI and local dev can verify
 * the backend is reachable.
 *
 * Validation (Phases.md §0): `GET /api/health` returns 200.
 */
'use strict';

const { Router } = require('express');

const router = Router();

/**
 * GET /api/health
 * @returns {{ status: string, timestamp: string, environment: string }}
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;

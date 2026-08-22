'use strict';

/**
 * health.test.js
 *
 * Phase 0 validation: GET /api/health must return 200.
 * (Phases.md §0, Validation section)
 */

const request = require('supertest');
const app = require('../app');

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
    });
    expect(res.body.timestamp).toBeDefined();
  });

  it('response body includes environment field', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.environment).toBeDefined();
  });
});

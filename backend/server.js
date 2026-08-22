/**
 * server.js — Entry point
 *
 * Starts the Express HTTP server. Kept separate from app.js so that
 * tests can import app.js without binding a port.
 */
'use strict';

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Assumption: console output in server startup is acceptable;
  // no plaintext secrets are logged here (Rules.md §21).
  // eslint-disable-next-line no-console
  console.log(`[HRMS Backend] Server running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[HRMS Backend] Health check: http://localhost:${PORT}/api/health`);
});

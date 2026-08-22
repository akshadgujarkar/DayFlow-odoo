/**
 * middleware/errorHandler.js
 *
 * Global Express error handler.
 * Rules.md §18–19: every endpoint must return a consistent error shape
 * and correct HTTP status codes.
 *
 * Shape: { error: { code: string, message: string } }
 */
'use strict';

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred.';

  // Do not log stack traces in production; never log secrets (Rules.md §21).
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`[${code}]`, message, err.stack);
  }

  res.status(status).json({
    error: { code, message },
  });
}

module.exports = errorHandler;

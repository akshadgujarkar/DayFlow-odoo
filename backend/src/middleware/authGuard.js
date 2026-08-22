/**
 * middleware/authGuard.js
 *
 * Phase 0 stub — full JWT verification implemented in Phase 2.
 *
 * Rules.md §20: all role/permission checks must be enforced server-side.
 * This middleware verifies the JWT on every protected route.
 *
 * Usage (Phase 2+):
 *   router.get('/employees', authGuard, roleGuard('admin'), handler);
 */
'use strict';

// const jwt = require('jsonwebtoken');

/**
 * Verifies the Bearer token in the Authorization header.
 * Attaches decoded payload to req.user on success.
 * Returns 401 if token is missing or invalid.
 */
function authGuard(_req, _res, next) {
  // Phase 2 TODO: implement JWT verification.
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'No token provided.' } });
  // }
  // const token = authHeader.split(' ')[1];
  // try {
  //   req.user = jwt.verify(token, process.env.JWT_SECRET);
  // } catch {
  //   return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Invalid or expired token.' } });
  // }
  next();
}

module.exports = authGuard;

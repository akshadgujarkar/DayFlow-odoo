/**
 * middleware/roleGuard.js
 *
 * Phase 0 stub — full role enforcement implemented in Phase 2.
 *
 * Rules.md §11, §20: role-gating logic must live in one reusable place.
 * This middleware must run AFTER authGuard (which populates req.user).
 *
 * Usage (Phase 2+):
 *   router.post('/employees', authGuard, roleGuard('admin'), createEmployee);
 */
'use strict';

/**
 * Returns a middleware that checks req.user.role against the allowed role.
 * Returns 403 if the role does not match.
 *
 * @param {'admin' | 'employee'} requiredRole
 */
function roleGuard(requiredRole) {
  return function (_req, _res, next) {
    // Phase 2 TODO: enable role enforcement once authGuard populates req.user.
    // if (!req.user || req.user.role !== requiredRole) {
    //   return res.status(403).json({
    //     error: { code: 'FORBIDDEN', message: 'Insufficient permissions.' },
    //   });
    // }
    next();
  };
}

module.exports = roleGuard;

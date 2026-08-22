'use strict';

const roleGuard = require('../middleware/roleGuard');

describe('roleGuard', () => {
  it('allows access if role matches', () => {
    const req = { user: { role: 'admin' } };
    const res = {};
    const next = jest.fn();

    const guard = roleGuard('admin');
    guard(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('returns 403 if role does not match', () => {
    const req = { user: { role: 'employee' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    const guard = roleGuard('admin');
    guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: { code: 'FORBIDDEN', message: 'Insufficient permissions.' }
    });
  });

  it('returns 403 if req.user is undefined', () => {
    const req = {}; // No user object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    const guard = roleGuard('admin');
    guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

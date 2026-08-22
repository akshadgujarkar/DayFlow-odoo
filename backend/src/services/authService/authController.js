'use strict';

const { Employee } = require('../../models');
const { comparePassword, hashPassword } = require('./passwordHelper');
const jwt = require('jsonwebtoken');

/**
 * Validates Login ID or Email + password.
 * Issues a JWT with the role claim.
 */
async function login(req, res, next) {
  try {
    const { login_id, email, password } = req.body;
    
    if (!password || (!login_id && !email)) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Login ID/Email and password are required.' }
      });
    }

    const whereClause = login_id ? { login_id } : { email };
    const employee = await Employee.findOne({ where: whereClause });

    if (!employee) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Invalid credentials.' }
      });
    }

    const isMatch = await comparePassword(password, employee.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Invalid credentials.' }
      });
    }

    const tokenPayload = {
      id: employee.id,
      login_id: employee.login_id,
      role: employee.role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: employee.id,
        login_id: employee.login_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        role: employee.role
      }
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Changes the user's password.
 * Requires authGuard middleware.
 */
async function changePassword(req, res, next) {
  try {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Both old and new passwords are required.' }
      });
    }

    const employee = await Employee.findByPk(req.user.id);
    if (!employee) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'User not found.' }
      });
    }

    const isMatch = await comparePassword(old_password, employee.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Invalid old password.' }
      });
    }

    const newHash = await hashPassword(new_password);
    employee.password_hash = newHash;
    await employee.save();

    return res.status(200).json({ message: 'Password changed successfully.' });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  changePassword
};

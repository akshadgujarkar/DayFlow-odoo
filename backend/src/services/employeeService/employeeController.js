'use strict';

const { Employee, sequelize } = require('../../models');
const { generateLoginId } = require('../authService/idGenerator');
const { generateFirstTimePassword, hashPassword } = require('../authService/passwordHelper');

/**
 * Creates a new employee. Only Admin can access this.
 * Auto-generates Login ID and first-time password.
 */
async function createEmployee(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const {
      first_name, last_name, email, date_of_joining, role
    } = req.body;

    if (!first_name || !last_name || !email || !date_of_joining) {
      await t.rollback();
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Missing required identity fields.' }
      });
    }

    // Check if email already exists
    const existing = await Employee.findOne({ where: { email }, transaction: t });
    if (existing) {
      await t.rollback();
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Email already exists.' }
      });
    }

    const login_id = await generateLoginId(first_name, last_name, date_of_joining);
    const plainPassword = generateFirstTimePassword();
    const password_hash = await hashPassword(plainPassword);

    const newEmployee = await Employee.create({
      ...req.body,
      login_id,
      password_hash,
      role: role || 'employee',
      first_name,
      last_name,
      email,
      date_of_joining
    }, { transaction: t });

    await t.commit();

    // Return the plain password ONLY ONCE so the admin can share it
    return res.status(201).json({
      message: 'Employee created successfully',
      employee: {
        id: newEmployee.id,
        login_id: newEmployee.login_id,
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        email: newEmployee.email,
        role: newEmployee.role
      },
      credentials: {
        login_id: newEmployee.login_id,
        password: plainPassword
      }
    });

  } catch (error) {
    await t.rollback();
    next(error);
  }
}

module.exports = {
  createEmployee
};

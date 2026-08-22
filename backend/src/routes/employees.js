'use strict';

const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');
const { createEmployee, getEmployees } = require('../services/employeeService/employeeController');

const router = Router();

// Phase 2: Create employee (Admin-only)
router.post('/', authGuard, roleGuard('admin'), createEmployee);

// Phase 4: List employees
router.get('/', authGuard, getEmployees);

module.exports = router;

'use strict';

const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');
const { 
  createEmployee, 
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  addSkill,
  deleteSkill,
  addCertification,
  deleteCertification
} = require('../services/employeeService/employeeController');

const {
  getEmployeeSalary,
  updateEmployeeSalary
} = require('../services/payrollService/salaryController');

const router = Router();

// Phase 2: Create employee (Admin-only)
router.post('/', authGuard, roleGuard('admin'), createEmployee);

// Phase 4: List employees
router.get('/', authGuard, getEmployees);

// Phase 5: Profile endpoints
router.get('/:id', authGuard, getEmployeeById);
router.put('/:id', authGuard, updateEmployeeById);
router.post('/:id/skills', authGuard, addSkill);
router.delete('/:id/skills/:skillId', authGuard, deleteSkill);
router.post('/:id/certifications', authGuard, addCertification);
router.delete('/:id/certifications/:certId', authGuard, deleteCertification);

// Phase 8: Salary Info endpoints (Admin-only for PUT, GET for self or admin)
router.get('/:id/salary', authGuard, (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id, 10)) {
    return res.status(403).json({
      error: { code: 'FORBIDDEN', message: 'You can only view your own salary.' }
    });
  }
  next();
}, getEmployeeSalary);
router.put('/:id/salary', authGuard, roleGuard('admin'), updateEmployeeSalary);

module.exports = router;

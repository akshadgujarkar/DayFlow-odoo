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

module.exports = router;

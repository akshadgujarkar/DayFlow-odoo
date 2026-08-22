'use strict';

const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const { login, changePassword } = require('../services/authService/authController');

const router = Router();

// Phase 2: Login and Change Password
router.post('/login', login);
router.post('/change-password', authGuard, changePassword);

module.exports = router;

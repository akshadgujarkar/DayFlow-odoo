'use strict';

const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');
const {
  applyForLeave,
  getLeaveRequests,
  updateRequestStatus
} = require('../services/timeOffService/timeOffController');

const router = Router();

router.post('/', authGuard, applyForLeave);
router.get('/', authGuard, getLeaveRequests);
router.put('/:id/status', authGuard, roleGuard('admin'), updateRequestStatus);

module.exports = router;

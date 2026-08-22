'use strict';

const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const { 
  getTodayStatus, 
  checkIn, 
  checkOut, 
  getMyAttendance 
} = require('../services/attendanceService/attendanceController');

const router = Router();

router.get('/today', authGuard, getTodayStatus);
router.post('/check-in', authGuard, checkIn);
router.post('/check-out', authGuard, checkOut);
router.get('/my', authGuard, getMyAttendance);

module.exports = router;

'use strict';

const { AttendanceRecord } = require('../../models');
const { Op } = require('sequelize');

async function getTodayStatus(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const record = await AttendanceRecord.findOne({
      where: {
        employee_id: req.user.id,
        date: today
      }
    });
    
    if (!record) {
      return res.status(200).json({ status: 'not_checked_in' });
    } else if (record.check_in_time && !record.check_out_time) {
      return res.status(200).json({ status: 'checked_in', record });
    } else {
      return res.status(200).json({ status: 'checked_out', record });
    }
  } catch (error) {
    next(error);
  }
}

async function checkIn(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    const [record, created] = await AttendanceRecord.findOrCreate({
      where: { employee_id: req.user.id, date: today },
      defaults: {
        check_in_time: now
      }
    });

    if (!created && record.check_in_time) {
      return res.status(400).json({ error: { message: 'Already checked in today' } });
    }

    return res.status(201).json({ message: 'Checked in successfully', record });
  } catch (error) {
    next(error);
  }
}

async function checkOut(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    const record = await AttendanceRecord.findOne({
      where: { employee_id: req.user.id, date: today }
    });

    if (!record || !record.check_in_time) {
      return res.status(400).json({ error: { message: 'Not checked in today' } });
    }
    if (record.check_out_time) {
      return res.status(400).json({ error: { message: 'Already checked out today' } });
    }

    const checkInTime = new Date(record.check_in_time);
    const durationMs = now - checkInTime;
    const workHours = (durationMs / (1000 * 60 * 60)).toFixed(2);

    record.check_out_time = now;
    record.work_hours = workHours;
    await record.save();

    return res.status(200).json({ message: 'Checked out successfully', record });
  } catch (error) {
    next(error);
  }
}

async function getMyAttendance(req, res, next) {
  try {
    const records = await AttendanceRecord.findAll({
      where: { employee_id: req.user.id },
      order: [['date', 'DESC']]
    });
    return res.status(200).json(records);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTodayStatus,
  checkIn,
  checkOut,
  getMyAttendance
};

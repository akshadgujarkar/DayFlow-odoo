'use strict';

const { TimeOffRequest, Employee } = require('../../models');

async function applyForLeave(req, res, next) {
  try {
    const { type, start_date, end_date, remarks } = req.body;
    const employee_id = req.user.id;

    if (!type || !start_date || !end_date) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Type, start date, and end date are required.' }
      });
    }

    // Calculate allocation_days (simple difference for now, in a real system we'd skip weekends)
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (end < start) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'End date cannot be before start date.' }
      });
    }
    
    // Calculate inclusive days
    const diffTime = Math.abs(end - start);
    const allocation_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const request = await TimeOffRequest.create({
      employee_id,
      type,
      start_date,
      end_date,
      allocation_days,
      remarks,
      status: 'Pending'
    });

    return res.status(201).json({ message: 'Leave request submitted successfully.', request });
  } catch (error) {
    next(error);
  }
}

async function getLeaveRequests(req, res, next) {
  try {
    const isAdmin = req.user.role === 'admin';
    let whereClause = {};

    if (!isAdmin) {
      whereClause.employee_id = req.user.id;
    }

    const requests = await TimeOffRequest.findAll({
      where: whereClause,
      include: [
        { model: Employee, attributes: ['id', 'first_name', 'last_name', 'login_id', 'department'] }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
}

async function updateRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, admin_comment } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid status.' }
      });
    }

    const request = await TimeOffRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Leave request not found.' }
      });
    }

    request.status = status;
    if (admin_comment) {
      request.admin_comment = admin_comment;
    }

    await request.save();

    return res.status(200).json({ message: `Leave request ${status.toLowerCase()} successfully.`, request });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  applyForLeave,
  getLeaveRequests,
  updateRequestStatus
};

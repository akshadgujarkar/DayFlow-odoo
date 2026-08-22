'use strict';

const { getSalaryProfile, updateSalaryProfile } = require('./salaryService');

const getEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.query; // optional for payable days computation

    const profile = await getSalaryProfile(id, year, month);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching salary profile:', error);
    res.status(500).json({ message: 'Server error fetching salary profile' });
  }
};

const updateEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params;
    
    // validate
    if (!req.body.wage_amount || !req.body.wage_type || !req.body.working_days_per_week) {
      return res.status(400).json({ message: 'Missing required salary profile fields' });
    }

    const updatedProfile = await updateSalaryProfile(id, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating salary profile:', error);
    res.status(500).json({ message: 'Server error updating salary profile' });
  }
};

module.exports = {
  getEmployeeSalary,
  updateEmployeeSalary
};

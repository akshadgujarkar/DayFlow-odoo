'use strict';

const { SalaryProfile, AttendanceRecord, TimeOffRequest } = require('../../models');
const { Op } = require('sequelize');

const calculateSalaryComponents = (wageAmount) => {
  const wage = parseFloat(wageAmount) || 0;
  
  // Phase 8 formulas
  const basicSalary = wage * 0.5;
  const hra = basicSalary * 0.5;
  const standardAllowance = 4167.0;
  const performanceBonus = basicSalary * 0.0833;
  const leaveTravelAllowance = basicSalary * 0.0833;
  
  const sumOthers = basicSalary + hra + standardAllowance + performanceBonus + leaveTravelAllowance;
  const fixedAllowance = wage - sumOthers;

  // Deductions
  const professionalTax = 200.0;
  const pfEmployeeContribution = basicSalary * 0.12;
  const pfEmployerContribution = basicSalary * 0.12;

  return {
    basic_salary: basicSalary.toFixed(2),
    hra: hra.toFixed(2),
    standard_allowance: standardAllowance.toFixed(2),
    performance_bonus: performanceBonus.toFixed(2),
    leave_travel_allowance: leaveTravelAllowance.toFixed(2),
    fixed_allowance: fixedAllowance.toFixed(2),
    professional_tax: professionalTax.toFixed(2),
    pf_employee_contribution: pfEmployeeContribution.toFixed(2),
    pf_employer_contribution: pfEmployerContribution.toFixed(2),
  };
};

const getPayableDays = async (employeeId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // 1. Get attendance days
  const attendanceRecords = await AttendanceRecord.count({
    where: {
      employee_id: employeeId,
      date: {
        [Op.between]: [startDate, endDate]
      },
      check_in_time: {
        [Op.not]: null
      }
    }
  });

  // 2. Get approved time off (Paid or Sick, not Unpaid)
  const approvedTimeOffs = await TimeOffRequest.findAll({
    where: {
      employee_id: employeeId,
      status: 'Approved',
      type: {
        [Op.in]: ['Paid Time Off', 'Sick Leave']
      },
      start_date: {
        [Op.lte]: endDate
      },
      end_date: {
        [Op.gte]: startDate
      }
    }
  });

  let paidLeaveDays = 0;
  for (const timeOff of approvedTimeOffs) {
    const start = new Date(Math.max(new Date(timeOff.start_date), startDate));
    const end = new Date(Math.min(new Date(timeOff.end_date), endDate));
    // Calculate days overlapping in the current month
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    paidLeaveDays += diffDays;
  }

  return attendanceRecords + paidLeaveDays;
};

const getSalaryProfile = async (employeeId, year, month) => {
  let profile = await SalaryProfile.findOne({ where: { employee_id: employeeId } });
  
  if (!profile) {
    profile = {
      wage_type: 'Fixed wage',
      wage_amount: 0,
      working_days_per_week: 5,
      basic_salary: 0,
      hra: 0,
      standard_allowance: 0,
      performance_bonus: 0,
      leave_travel_allowance: 0,
      fixed_allowance: 0,
      professional_tax: 0,
      pf_employee_contribution: 0,
      pf_employer_contribution: 0
    };
  } else {
    profile = profile.toJSON();
  }

  // Calculate payable days for current month/year
  let payableDays = 0;
  if (year && month) {
    payableDays = await getPayableDays(employeeId, year, month);
  }

  return {
    ...profile,
    payable_days: payableDays
  };
};

const updateSalaryProfile = async (employeeId, data) => {
  const { wage_type, wage_amount, working_days_per_week } = data;
  
  const components = calculateSalaryComponents(wage_amount);
  
  const profileData = {
    employee_id: employeeId,
    wage_type,
    wage_amount,
    working_days_per_week,
    ...components
  };

  const [profile, created] = await SalaryProfile.upsert(profileData, {
    returning: true
  });

  return profile;
};

module.exports = {
  getSalaryProfile,
  updateSalaryProfile,
  calculateSalaryComponents,
  getPayableDays
};

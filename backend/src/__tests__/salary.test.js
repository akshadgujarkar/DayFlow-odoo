'use strict';

const { calculateSalaryComponents } = require('../services/payrollService/salaryService');

describe('Salary Component Calculations', () => {
  it('should correctly calculate components for 50000 wage', () => {
    // 50% wage -> 25000 basic; HRA 12500; etc
    const wage = 50000;
    const components = calculateSalaryComponents(wage);

    expect(components.basic_salary).toBe('25000.00'); // 50% of 50000
    expect(components.hra).toBe('12500.00'); // 50% of 25000
    expect(components.standard_allowance).toBe('4167.00'); // fixed
    expect(components.performance_bonus).toBe('2082.50'); // 8.33% of 25000
    expect(components.leave_travel_allowance).toBe('2082.50'); // 8.33% of 25000
    
    // sumOthers = 25000 + 12500 + 4167 + 2082.5 + 2082.5 = 45832.00
    // fixed_allowance = 50000 - 45832.00 = 4168.00
    expect(components.fixed_allowance).toBe('4168.00');

    // Deductions
    expect(components.professional_tax).toBe('200.00');
    expect(components.pf_employee_contribution).toBe('3000.00'); // 12% of 25000
    expect(components.pf_employer_contribution).toBe('3000.00');
  });

  it('should correctly handle 0 wage', () => {
    const wage = 0;
    const components = calculateSalaryComponents(wage);

    expect(components.basic_salary).toBe('0.00');
    expect(components.hra).toBe('0.00');
    expect(components.standard_allowance).toBe('4167.00');
    expect(components.performance_bonus).toBe('0.00');
    expect(components.leave_travel_allowance).toBe('0.00');
    
    // fixed allowance = 0 - 4167 = -4167.00
    expect(components.fixed_allowance).toBe('-4167.00');
  });
});

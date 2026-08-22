/**
 * payrollApi.js
 * Phase 0 stub — functions will be implemented in Phase 8.
 */
import axiosClient from './axiosClient';

export const getSalaryInfo = (employeeId) =>
  axiosClient.get(`/employees/${employeeId}/salary`);

export const updateSalaryInfo = (employeeId, data) =>
  axiosClient.put(`/employees/${employeeId}/salary`, data);

/**
 * employeeApi.js
 * Phase 0 stub — functions will be implemented in Phase 2/4.
 */
import axiosClient from './axiosClient';

export const getEmployees = (params) =>
  axiosClient.get('/employees', { params });

export const getEmployee = (id) =>
  axiosClient.get(`/employees/${id}`);

export const createEmployee = (data) =>
  axiosClient.post('/employees', data);

export const updateEmployee = (id, data) =>
  axiosClient.put(`/employees/${id}`, data);

/**
 * timeOffApi.js
 * Phase 0 stub — functions will be implemented in Phase 7.
 */
import axiosClient from './axiosClient';

export const createTimeOffRequest = (data) =>
  axiosClient.post('/timeoff', data);

export const getMyTimeOff = () =>
  axiosClient.get('/timeoff/me');

export const getAllTimeOff = (params) =>
  axiosClient.get('/timeoff', { params });

export const approveTimeOff = (id) =>
  axiosClient.patch(`/timeoff/${id}/approve`);

export const rejectTimeOff = (id) =>
  axiosClient.patch(`/timeoff/${id}/reject`);

export const getAllocations = () =>
  axiosClient.get('/timeoff/allocations');

export const updateAllocations = (data) =>
  axiosClient.put('/timeoff/allocations', data);

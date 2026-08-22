/**
 * attendanceApi.js
 * Phase 0 stub — functions will be implemented in Phase 6.
 */
import axiosClient from './axiosClient';

export const checkIn = () =>
  axiosClient.post('/attendance/check-in');

export const checkOut = () =>
  axiosClient.post('/attendance/check-out');

export const getMyAttendance = (params) =>
  axiosClient.get('/attendance/me', { params });

export const getTodayAttendance = (params) =>
  axiosClient.get('/attendance/today', { params });

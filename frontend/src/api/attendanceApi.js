import axiosClient from './axiosClient';

export const getTodayStatus = async () => {
  const response = await axiosClient.get('/attendance/today');
  return response.data;
};

export const checkIn = async () => {
  const response = await axiosClient.post('/attendance/check-in');
  return response.data;
};

export const checkOut = async () => {
  const response = await axiosClient.post('/attendance/check-out');
  return response.data;
};

export const getMyAttendance = async () => {
  const response = await axiosClient.get('/attendance/my');
  return response.data;
};

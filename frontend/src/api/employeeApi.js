import axiosClient from './axiosClient';

export const getEmployees = async (search = '') => {
  const response = await axiosClient.get(`/employees${search ? `?search=${encodeURIComponent(search)}` : ''}`);
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await axiosClient.post('/employees', data);
  return response.data;
};

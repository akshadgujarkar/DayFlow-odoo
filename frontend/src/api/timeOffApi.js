import axiosClient from './axiosClient';

export const submitLeaveRequest = async (data) => {
  const response = await axiosClient.post('/timeoff', data);
  return response.data;
};

export const getLeaveRequests = async () => {
  const response = await axiosClient.get('/timeoff');
  return response.data;
};

export const updateLeaveStatus = async (id, status, admin_comment) => {
  const response = await axiosClient.put(`/timeoff/${id}/status`, { status, admin_comment });
  return response.data;
};

import axiosClient from './axiosClient';

export const getEmployees = async (search = '') => {
  const response = await axiosClient.get(`/employees${search ? `?search=${encodeURIComponent(search)}` : ''}`);
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await axiosClient.post('/employees', data);
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await axiosClient.get(`/employees/${id}`);
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await axiosClient.put(`/employees/${id}`, data);
  return response.data;
};

export const addSkill = async (id, skill_name) => {
  const response = await axiosClient.post(`/employees/${id}/skills`, { skill_name });
  return response.data;
};

export const deleteSkill = async (id, skillId) => {
  const response = await axiosClient.delete(`/employees/${id}/skills/${skillId}`);
  return response.data;
};

export const addCertification = async (id, certification_name) => {
  const response = await axiosClient.post(`/employees/${id}/certifications`, { certification_name });
  return response.data;
};

export const deleteCertification = async (id, certId) => {
  const response = await axiosClient.delete(`/employees/${id}/certifications/${certId}`);
  return response.data;
};

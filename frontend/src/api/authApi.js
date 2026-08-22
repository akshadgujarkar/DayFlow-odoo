/**
 * authApi.js
 * Phase 0 stub — functions will be implemented in Phase 2/3.
 * All calls go through the shared axiosClient (Rules.md §6).
 */
import axiosClient from './axiosClient';

export const login = (credentials) =>
  axiosClient.post('/auth/login', credentials);

export const changePassword = (payload) =>
  axiosClient.post('/auth/change-password', payload);

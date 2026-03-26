import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  signup: (data) => axios.post(`${API_URL}/auth/signup`, data),
  getPendingUsers: () => axios.get(`${API_URL}/auth/pending-users`),
  getAllUsers: () => axios.get(`${API_URL}/auth/all-users`),
  approveUser: (id) => axios.post(`${API_URL}/auth/approve-user/${id}`),
  rejectUser: (id) => axios.delete(`${API_URL}/auth/reject-user/${id}`),
  deleteUser: (id) => axios.delete(`${API_URL}/auth/delete-user/${id}`),
  getNotifications: () => axios.get(`${API_URL}/auth/notifications`),
  updateProfile: (data) => axios.put(`${API_URL}/auth/profile`, data),
  changePassword: (data) => axios.put(`${API_URL}/auth/password`, data)
};

export const productionService = {
  getAll: (date) => axios.get(`${API_URL}/production${date ? `?date=${date}` : ''}`),
  create: (data) => axios.post(`${API_URL}/production`, data),
  update: (id, data) => axios.put(`${API_URL}/production/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/production/${id}`)
};

export const issueService = {
  getAll: () => axios.get(`${API_URL}/issues`),
  create: (data) => axios.post(`${API_URL}/issues`, data),
  update: (id, data) => axios.put(`${API_URL}/issues/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/issues/${id}`)
};

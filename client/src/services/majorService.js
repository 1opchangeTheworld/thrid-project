import api from '../api/axios';

export const getMajors = () => api.get('/majors');
export const getMajor = (id) => api.get(`/majors/${id}`);
export const createMajor = (data) => api.post('/majors', data);
export const updateMajor = (id, data) => api.put(`/majors/${id}`, data);
export const deleteMajor = (id) => api.delete(`/majors/${id}`);
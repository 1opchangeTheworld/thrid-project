import api from '../api/axios';

export const getStudents = () => api.get('/students');
export const getStudent = (id) => api.get(`/students/${id}`);
export const createStudent = (data) => api.post('/students', data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const importStudents = (formData) =>
  api.post('/students/import', formData, { headers: { "Content-Type": "multipart/form-data" } });
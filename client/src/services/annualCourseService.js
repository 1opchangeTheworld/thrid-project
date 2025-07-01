import api from '../api/axios';

export const getAnnualCourses = () => api.get('/annual-courses');
export const getAnnualCourse = (id) => api.get(`/annual-courses/${id}`);
export const createAnnualCourse = (data) => api.post('/annual-courses', data);
export const updateAnnualCourse = (id, data) => api.put(`/annual-courses/${id}`, data);
export const deleteAnnualCourse = (id) => api.delete(`/annual-courses/${id}`);


export const getAnnualCourseSubjects = () => api.get('/annual-courses/subject');
export const getAnnualCourseSubject = (id) => api.get(`/annual-courses/subject/${id}`);
export const createAnnualCourseSubject = (data) => api.post('/annual-courses/subject', data);
export const updateAnnualCourseSubject = (id, data) => api.put(`/annual-courses/subject/${id}`, data);
export const deleteAnnualCourseSubject = (id) => api.delete(`/annual-courses/subject/${id}`);
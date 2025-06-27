import api from '../api/axios';

export const getSemesters = () => api.get('/semesters');
export const getSemester = (id) => api.get(`/semesters/${id}`);
export const createSemester = (data) => api.post('/semesters', data);
export const updateSemester = (id, data) => api.put(`/semesters/${id}`, data);
export const deleteSemester = (id) => api.delete(`/semesters/${id}`);
export const getSemesterSummary = (id) => api.get(`/semesters/summary/${id}`);
export const getSemesterSummaryByYear = (year) => api.get(`/semesters/summary/year/${year}`);
export const getSubjectsByYearFacultyMajor = (year, facultyId, majorId) =>
  api.get(`/semesters/${year}/subjects/${facultyId}/${majorId}`);


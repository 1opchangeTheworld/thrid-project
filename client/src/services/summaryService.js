import api from "../api/axios";

export const getStudentSummary = (id) => api.get(`/api/summary/${id}`);

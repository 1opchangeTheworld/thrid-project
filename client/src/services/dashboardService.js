import api from "../api/axios";

export const getUserStats = () =>
  api.get("/api/dashboard/user-stats");

export const getStudentStats = () =>
  api.get("/api/dashboard/student-stats");

export const getCompareSubjectByYear = () =>
  api.get("/api/dashboard/annual-courses/2025");
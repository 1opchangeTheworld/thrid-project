import api from "../api/axios";

export const login = (data) =>
  api.post("/admin/login", data, { withCredentials: true });

export const logout = () =>
  api.post("/admin/logout", {}, { withCredentials: true });

export const getProfile = () =>
  api.get("/admin/profile", { withCredentials: true });
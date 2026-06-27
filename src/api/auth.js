import { apiClient } from "./client";
import { ENDPOINTS } from "../constants/endpoints";

export const authApi = {
  login: (username, password) =>
    apiClient.post(`${ENDPOINTS.AUTH}/login`, { username, password }),

  register: (username, password) =>
    apiClient.post(`${ENDPOINTS.AUTH}/register`, { username, password }),
};
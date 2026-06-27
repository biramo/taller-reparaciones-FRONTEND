import { apiClient } from "./client";
import { ENDPOINTS } from "../constants/endpoints";

export const tecnicosApi = {
  obtenerTodos: () => apiClient.get(ENDPOINTS.TECNICOS),

  obtenerPorId: (id) =>
    apiClient.get(`${ENDPOINTS.TECNICOS}/${id}`),

  crear: (datos) =>
    apiClient.post(ENDPOINTS.TECNICOS, datos),

  eliminar: (id) =>
    apiClient.delete(`${ENDPOINTS.TECNICOS}/${id}`),
};
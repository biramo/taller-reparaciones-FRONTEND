// src/api/createResourceApi.js
import { apiClient } from './client';

export function createResourceApi(endpoint) {
  return {
    obtenerTodos: () => apiClient.get(endpoint),
    obtenerPorId: (id) => apiClient.get(`${endpoint}/${id}`),
    crear: (datos) => apiClient.post(endpoint, datos),
    eliminar: (id) => apiClient.delete(`${endpoint}/${id}`),
  };
}
// src/api/orden_pieza.js — solo tiene crear y eliminar, sin obtenerTodos/obtenerPorId
import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';

export const ordenPiezasApi = {
  crear: (datos) => apiClient.post(ENDPOINTS.ORDEN_PIEZAS, datos),
  eliminar: (id) => apiClient.delete(`${ENDPOINTS.ORDEN_PIEZAS}/${id}`),
};
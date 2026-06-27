// src/api/orden_reparacion.js
import { createResourceApi } from './createResourceApi';
import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';

export const ordenesApi = {
  ...createResourceApi(ENDPOINTS.ORDENES),
  cambiarEstado: (id, estado) => apiClient.put(`${ENDPOINTS.ORDENES}/${id}/estado`, estado),
};
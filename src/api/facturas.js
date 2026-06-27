// src/api/facturas.js — sin eliminar, refleja la inmutabilidad de tu backend
import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';

export const facturasApi = {
  obtenerTodas: () => apiClient.get(ENDPOINTS.FACTURAS),
  obtenerPorId: (id) => apiClient.get(`${ENDPOINTS.FACTURAS}/${id}`),
  crear: (datos) => apiClient.post(ENDPOINTS.FACTURAS, datos),
};
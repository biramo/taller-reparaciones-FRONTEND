import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';

export const ordenPiezasApi = {
  crear: (datos) => apiClient.post(ENDPOINTS.ORDEN_PIEZAS, datos),
  eliminar: (id) => apiClient.delete(`${ENDPOINTS.ORDEN_PIEZAS}/${id}`),
};
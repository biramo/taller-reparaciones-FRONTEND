// src/api/clientes.js
import { createResourceApi } from './createResourceApi';
import { ENDPOINTS } from '../constants/endpoints';

export const clientesApi = createResourceApi(ENDPOINTS.CLIENTES);
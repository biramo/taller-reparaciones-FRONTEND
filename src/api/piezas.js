// src/api/piezas.js
import { createResourceApi } from './createResourceApi';
import { ENDPOINTS } from '../constants/endpoints';

export const piezasApi = createResourceApi(ENDPOINTS.PIEZAS);
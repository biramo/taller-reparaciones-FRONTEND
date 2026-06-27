// src/api/dispositivos.js
import { createResourceApi } from './createResourceApi';
import { ENDPOINTS } from '../constants/endpoints';

export const dispositivosApi = createResourceApi(ENDPOINTS.DISPOSITIVOS);
const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');//revisa si existe token

  const headers = {
    'Content-Type': 'application/json',//espera un json
    ...(token && { Authorization: `Bearer ${token}` }),//si no existe da null
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {//envia un request a la api
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('No autorizado');
  }

  //Creamos un error para saber que falló
 if (!response.ok) {
  const error = await response.json().catch(() => ({
    message: response.status === 403 
        ? 'No tienes permisos suficientes para realizar esta acción.' 
        : 'Error desconocido',
  }));

  const customError = new Error(error.message || `Error ${response.status}`);
  customError.status = response.status;
  customError.timestamp = error.timestamp;
  customError.data = error;

  throw customError;
}

  if (response.status === 204) return null; // DELETE sin contenido

  return response.json();
}

export const apiClient = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};
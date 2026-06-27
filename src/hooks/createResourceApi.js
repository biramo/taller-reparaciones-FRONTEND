// src/hooks/useCrudResource.js
import { useState, useEffect, useCallback } from 'react';

export function useCrudResource(api) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setError('');
      const data = await api.obtenerTodos();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [api]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const crear = async (datos) => {
    setError('');
    try {
      await api.crear(datos);
      await cargar();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const eliminar = async (id) => {
    setError('');
    try {
      await api.eliminar(id);
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  return { items, cargando, error, crear, eliminar, recargar: cargar };
}
// src/hooks/useBackendStatus.js
import { useState, useEffect, useCallback } from 'react';

export function useBackendStatus() {
  const [conectado, setConectado] = useState(true);
  const [cargando, setCargando] = useState(false);

  // Usamos useCallback para que la función 'recargar' no cambie en cada render
  const comprobar = useCallback(async () => {
    try {
      setCargando(true);
      await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, { method: 'OPTIONS' });
      setConectado(true);
    } catch {
      setConectado(false);
    } finally {
      setCargando(false);
    }
  }, []); // Array vacío porque no depende de variables externas dinámicas

  useEffect(() => {
    comprobar(); // Comprueba inmediatamente al montar el componente
    
    // Configura el intervalo estable de 15 segundos
    const intervalo = setInterval(comprobar, 15000); 

    // Limpia el intervalo cuando el componente que usa el hook se desmonte
    return () => clearInterval(intervalo); 
  }, [comprobar]); // Ponemos 'comprobar' aquí. Como tiene useCallback, solo se creará una vez.

  return { conectado, cargando, recargar: comprobar };
}
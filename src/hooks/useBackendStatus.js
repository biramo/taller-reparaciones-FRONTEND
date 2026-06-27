// src/hooks/useBackendStatus.js
import { useState, useEffect } from 'react';

export function useBackendStatus() {
  const [conectado, setConectado] = useState(true);

  useEffect(() => {
    const comprobar = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, { method: 'OPTIONS' });
        setConectado(true);
      } catch {
        setConectado(false);
      }
    };

    comprobar(); // comprueba al montar
    const intervalo = setInterval(comprobar, 15000); // y cada 15 segundos

    return () => clearInterval(intervalo); // limpieza al desmontar
  }, []);

  return conectado;
}
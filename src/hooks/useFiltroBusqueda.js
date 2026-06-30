// src/hooks/useFiltroBusqueda.js
import { useState, useMemo } from 'react';

export function useFiltroBusqueda(items, campo) {
  const [busqueda, setBusqueda] = useState('');

  const itemsFiltrados = useMemo(() => {
    return items.filter((item) =>
      item[campo]?.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [items, campo, busqueda]);

  return { busqueda, setBusqueda, itemsFiltrados };
}
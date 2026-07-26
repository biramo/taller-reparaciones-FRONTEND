// src/hooks/useDeleteDialog.js
import { useState } from 'react';

export function useDeleteDialog(eliminarFn) {
  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const pedirConfirmacion = (item) => {
    setSeleccionado(item);
    setOpen(true);
  };

  const confirmar = async () => {
    if (!seleccionado?.id) return;
    await eliminarFn(seleccionado.id);
    setOpen(false);
    setSeleccionado(null);
  };

  const cancelar = () => {
    setOpen(false);
    setSeleccionado(null);
  };

  return { open, seleccionado, pedirConfirmacion, confirmar, cancelar };
}
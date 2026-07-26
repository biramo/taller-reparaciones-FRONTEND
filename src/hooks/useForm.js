import { useState } from 'react';

export function useForm(valoresIniciales) {
  const [values, setValues] = useState(valoresIniciales);

  const handleChange = (campo) => (e) => {
    setValues((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const reset = () => setValues(valoresIniciales);

  return { values, handleChange, reset };
}
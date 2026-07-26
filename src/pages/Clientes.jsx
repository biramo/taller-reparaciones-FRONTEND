// src/pages/Clientes.jsx
import ResourcePage from '../components/ResourcePage';
import { clientesApi } from '../api/clientes';

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
];

const CAMPOS = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'telefono', label: 'Teléfono' },
  { name: 'email', label: 'Email', type: 'email' },
];

export default function Clientes() {
  return (
    <ResourcePage
      title="Clientes"
      api={clientesApi}
      columnas={COLUMNAS}
      campos={CAMPOS}
      searchField="nombre"
      nombreParaConfirmar="nombre"
    />
  );
}
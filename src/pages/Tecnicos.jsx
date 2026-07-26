// src/pages/Tecnicos.jsx
import ResourcePage from '../components/ResourcePage';
import { tecnicosApi } from '../api/tecnicos';

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especialidad', label: 'Especialidad' },
];

const CAMPOS = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'especialidad', label: 'Especialidad' },
];

export default function Tecnicos() {
  return (
    <ResourcePage
      title="Técnicos"
      api={tecnicosApi}
      columnas={COLUMNAS}
      campos={CAMPOS}
      searchField="nombre"
      nombreParaConfirmar="nombre"
    />
  );
}
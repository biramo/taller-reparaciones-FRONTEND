import ResourcePage from '../components/ResourcePage';
import { piezasApi } from '../api/piezas';

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'precio', label: 'Precio' },
  { key: 'stock', label: 'Stock' },

];

const CAMPOS = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'precio', label: 'Precio' },
  { name: 'stock', label: 'Stock', type: 'number',min:1,max:99, required:true },
];

export default function Piezas() {
  return (
    <ResourcePage
      title="Piezas"
      api={piezasApi}
      columnas={COLUMNAS}
      campos={CAMPOS}
      searchField="nombre"
      nombreParaConfirmar="nombre"
    />
  );
}
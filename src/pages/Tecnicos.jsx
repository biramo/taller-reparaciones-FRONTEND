import { useState, useEffect } from 'react';
import Input from '../components/Input';
import { tecnicosApi } from '../api/tecnicos';
import Spinner from '../components/Spinner';
import DataTable from '../components/DataTable';
import { useFiltroBusqueda } from '../hooks/useFiltroBusqueda';
import { useCrudResource } from '../hooks/createResourceApi';
import ConfirmDialog from '../components/ConfirmDialog';

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especialidad', label: 'Especialidad' },
];

export default function Tecnicos() {
  const { items: tecnicos, cargando, error, crear, eliminar } = useCrudResource(tecnicosApi);
  const { busqueda, setBusqueda, itemsFiltrados } = useFiltroBusqueda(tecnicos, 'nombre');

  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [openConfirm, setOpenConfirm]=useState(false);
  const [tecnicoAEliminar,setTecnicoAEliminar]=useState(null);

  const handleEliminarClick=(tecnico)=>{
    setTecnicoAEliminar(tecnico);
    setOpenConfirm(true);
  }

  const confirmarEliminar = async () => {
    if (!tecnicoAEliminar?.id) return;
    
    await eliminar(tecnicoAEliminar.id);
    setOpenConfirm(false);
    setTecnicoAEliminar(null);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const ok = await crear({ nombre, especialidad });
      if (ok) {
        setNombre('');
        setEspecialidad('');
      }
    };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tecnicos</h1>
      <div className='flex justify-center mb-6 w-full'>
        <Input
          type="text"
          placeholder="Buscar tecnico..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className=" w-1/2
          text-center
          min-w-[160px]
          border px-3 py-2 mb-4 focus:rounded hover:rounded"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border rounded px-3 py-2 flex-1"
        />
        <Input
          type="text"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Añadir
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {cargando ? <Spinner/>
       
      :<DataTable
        columnas={COLUMNAS}
        datos={itemsFiltrados}
        onEliminar={handleEliminarClick}
       />}
       <ConfirmDialog
              open={openConfirm}
              title="Eliminar Tecnico"
              message={`¿Seguro que quieres eliminar a ${tecnicoAEliminar?.nombre}?`}
              onCancel={() => setOpenConfirm(false)}
              onConfirm={confirmarEliminar}
        />
    </section>
  );
}
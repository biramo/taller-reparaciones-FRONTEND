import { useState, useEffect } from 'react';
import Input from '../components/Input';
import { clientesApi } from '../api/clientes';
import Spinner from '../components/Spinner';
import DataTable from '../components/DataTable';
import { useFiltroBusqueda } from '../hooks/useFiltroBusqueda';
import { useCrudResource } from '../hooks/createResourceApi';
import ConfirmDialog from '../components/ConfirmDialog';

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
];

export default function Clientes() {
  const { items: clientes, cargando, error, crear, eliminar } = useCrudResource(clientesApi);
  const { busqueda, setBusqueda, itemsFiltrados } = useFiltroBusqueda(clientes, 'nombre');

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [clienteAEliminar, setClienteAEliminar]=useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await crear({ nombre, telefono, email });
    if (ok) {
      setNombre('');
      setTelefono('');
      setEmail('');
    }
  };

  const handleEliminarClick=(cliente)=>{
    setClienteAEliminar(cliente);
    setOpenConfirm(true);
  }

  const confirmarEliminar = async () => {
    if (!clienteAEliminar?.id) return;
    
    await eliminar(clienteAEliminar.id);
    setOpenConfirm(false);
    setClienteAEliminar(null);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Clientes</h1>
      <div className='flex justify-center mb-6 w-full'>
        <Input
          type="text"
          placeholder="Buscar cliente..."
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
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        title="Eliminar cliente"
        message={`¿Seguro que quieres eliminar a ${clienteAEliminar?.nombre}?`}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={confirmarEliminar}
      />
    </section>
  );
}
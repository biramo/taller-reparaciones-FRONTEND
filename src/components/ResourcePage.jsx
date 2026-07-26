// src/components/ResourcePage.jsx
import { useCrudResource } from '../hooks/createResourceApi';
import { useFiltroBusqueda } from '../hooks/useFiltroBusqueda';
import { useDeleteDialog } from '../hooks/useDeleteDialog';
import { useForm } from '../hooks/useForm';
import SearchBar from './ui/SearchBar';
import EntityForm from '../components/ui/EntityForm';
import DataTable from './ui/DataTable';
import ConfirmDialog from './ui/ConfirmDialog';
import Spinner from './ui/Spinner';
import RenderErrorNoConnection from './ui/RenderErrorNoConnection';
import {useBackendStatus} from '../hooks/useBackendStatus'

export default function ResourcePage({ title, api, columnas, campos, searchField, nombreParaConfirmar }) {
  const { items, crear, eliminar, error } = useCrudResource(api);
  const { conectado,cargando, recargar}=useBackendStatus();
  const { busqueda, setBusqueda, itemsFiltrados } = useFiltroBusqueda(items, searchField);
  const { values, handleChange, reset } = useForm(
    Object.fromEntries(campos.map((c) => [c.name, '']))
  );

  const { open, seleccionado, pedirConfirmacion, confirmar, cancelar } = useDeleteDialog(eliminar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await crear(values);
    if (ok) reset();
  };

  //Estado de carga
  if(!conectado && cargando) return <Spinner/>  

  //Estado de error
  if (!conectado && !cargando) return <RenderErrorNoConnection onClick={recargar}/>

  return (
    <section className="max-w-4xl mx-auto p-6 flex flex-col gap-2 flex-wrap min-h-full">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <SearchBar
        value={busqueda}
        onChange={setBusqueda}
        placeholder={`Buscar ${title.toLowerCase()}...`}
      />

      <EntityForm campos={campos} values={values} onChange={handleChange} onSubmit={handleSubmit} />
      {error&&<p className='text-red-600 font-bold'>{error}</p>}

      {cargando ? (
        <Spinner />
      ) : (
        <DataTable columnas={columnas} datos={itemsFiltrados} onEliminar={pedirConfirmacion} />
      )}

      <ConfirmDialog
        open={open}
        title={`Eliminar ${title.slice(0, -1)}`}
        message={`¿Seguro que quieres eliminar a ${seleccionado?.[nombreParaConfirmar]}?`}
        onCancel={cancelar}
        onConfirm={confirmar}
      />
    </section>
  );
}
import ResourcePage from '../components/ResourcePage'
import { dispositivosApi } from '../api/dispositivos';

const COLUMNAS = [
  { key: 'clienteId', label: 'Cliente id' },
  { key: 'tipoDispositivo', label: 'Tipo de dispositivo' },
  { key: 'marca', label: 'Marca' },
  { key:'modelo', label: 'Modelo'},
  { key:'numeroSerie', label: 'Numero de serie'}

];

const CAMPOS = [
  { name: 'clienteId', label: 'Cliente id', requiered:true},
  { name: 'tipoDispositivo', label: 'Tipo de dispositivo', requiered:true },
  { name: 'marca', label: 'Marca' },
  { name: 'modelo', label: 'Modelo'},
  { name:'numeroSerie', label: 'Numero de serie', type:"number", requiered:true}
];

export default function Dispositivos(){
    return(

    <ResourcePage
      title="Dispositivos"
      api={dispositivosApi}
      columnas={COLUMNAS}
      campos={CAMPOS}
      searchField="numeroSerie"
      nombreParaConfirmar="numeroSerie"
    />
    )
}
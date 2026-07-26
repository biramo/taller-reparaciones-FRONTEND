import DataTable from "../components/ui/DataTable"
import { tecnicosApi} from '../api/tecnicos';
import { clientesApi} from '../api/clientes';
import { dispositivosApi} from '../api/dispositivos';
import { ordenesApi} from '../api/orden_reparacion';
import { useBackendStatus } from "../hooks/useBackendStatus";
import { useCrudResource } from "../hooks/createResourceApi";
import  {useShowDataOrdenes} from '../hooks/useShowDataOrdenes'
import { ACTIONS } from "../constants/ActionsUseShowDataOrdenes";
import A from "../components/ui/A";
import H2 from "../components/ui/H2";

export default function Ordenes(){

    //Controlamos la visibilidad de los datos 
    const {state,dispatch}=useShowDataOrdenes()

    //Conocer el estado del backend
    const { conectado,cargando, recargar}=useBackendStatus();

    //Apis para traer la informacion
    const clientesData = useCrudResource(clientesApi);
    const tecnicosData = useCrudResource(tecnicosApi)
    const dispositivosData = useCrudResource(dispositivosApi);
    const OrdenesData = useCrudResource(ordenesApi);

    const COLUMNAS_CLIENTES = [
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
    ];

    const COLUMNAS_TECNICOS = [
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
    ];


    const COLUMNAS_DISPOSITIVOS = [
        { key: 'clienteId', label: 'Cliente id' },
        { key: 'tipoDispositivo', label: 'Tipo de dispositivo' },
        { key: 'marca', label: 'Marca' },
        { key:'modelo', label: 'Modelo'},
        { key:'numeroSerie', label: 'Numero de serie'}
    ];

    /*//Buscador de datos
    const initialState={
        busquedaclientes:useFiltroBusqueda(clientesApi.items, "nombre"),
        busquedaTecnicos:useFiltroBusqueda(tecnicosApi.items, "nombre"),
        busquedaDispositivos:useFiltroBusqueda(dispositivosApi.items, "numeroSerie"),

    }*/
    

    //Estado de carga
    if(!conectado && cargando) return <Spinner/>  
    
    //Estado de error
    if (!conectado && !cargando) return <RenderErrorNoConnection onClick={recargar}/>
        
    return(
    <>  
        <section>
            <div className="flex justify-between">
                <A href="#clientes-data" onClick={()=>dispatch({type:ACTIONS.TOGGLE_CLIENTES})}>Mostrar Clientes</A>
                <A href="#tecnicos-data" onClick={()=>dispatch({type:ACTIONS.TOGGLE_TECNICOS})}>Mostrar Tecnicos</A>
                <A href="#dispositivos-data" onClick={()=>dispatch({type:ACTIONS.TOGGLE_DISPOSITIVOS})}>Mostrar Dispositivos</A>
            </div>
            <div>
                {/* Contenedor para la info de ordenes*/}
            </div>
        </section>
        <section className="flex flex-col gap-10">

            {state.clientes&&
                <div id="clientes-data">
                    <H2>Clientes</H2>
                    <DataTable 
                        columnas={COLUMNAS_CLIENTES} 
                        datos={clientesData.items} 
                    />
                </div>
            }
            
            {state.tecnicos&&
                <div id="tecnicos-data">
                    <H2>Tecnicos</H2>
                    <DataTable  
                        columnas={COLUMNAS_TECNICOS} 
                        datos={tecnicosData.items} 
                    />
                </div>
            }
            
            {state.dispositivos&&
            <div id="dispositivos-data">
                <H2>Dispositivos</H2>
                <DataTable
                    columnas={COLUMNAS_DISPOSITIVOS}
                    datos={dispositivosData.items}
                />
            </div>
            }
        </section>
    </>
    )

}
    



   

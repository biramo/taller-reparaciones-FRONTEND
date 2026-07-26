import { useState, useEffect,useMemo } from 'react';
import { clientesApi } from '../api/clientes';
import { ordenesApi } from '../api/orden_reparacion';
import { piezasApi } from '../api/piezas';

export function useDashboard(){
    const [totalClientes, setTotalClientes] = useState(0);
    const [ordenesAbiertas, setOrdenesAbiertas] = useState([]);
    const [totalStockBajo, setTotalStockBajo] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [failedFetch, setFailedFetch]=useState(false);
    
    const obtenerDatos = () =>
        Promise.all([
            clientesApi.obtenerTodos(),
            ordenesApi.obtenerTodos(),
            piezasApi.obtenerTodos(),
    ]);

    const cargarResumen = async()=>{
            setFailedFetch(false);
            setCargando(true);
        try{
            
            const [clientes, ordenes, piezas]= await obtenerDatos();

            setTotalClientes(clientes.length);

            const piezasBajas=piezas.filter((pieza)=>pieza.stock<5);
            setTotalStockBajo(piezasBajas.length)

            const filtradas=ordenes.filter((orden)=>
                orden.estado==="RECIBIDO" || orden.estado==="DIAGNOSTICADO"
            )
            setOrdenesAbiertas(filtradas);

        }catch(error){
            console.error('Error cargando resumen:', error);
            setFailedFetch(true)

        }finally{
            setCargando(false);
        }
        
    }

    useEffect(()=>{
        cargarResumen();
    },[])


    return {
        totalClientes,
        ordenesAbiertas,
        totalStockBajo,
        cargando,
        failedFetch,
        recargar:cargarResumen
    };
}
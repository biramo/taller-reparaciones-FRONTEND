import { useState, useEffect } from 'react';
import { clientesApi } from '../api/clientes';
import { ordenesApi } from '../api/orden_reparacion';
import { piezasApi } from '../api/piezas';
import IconoResumen from '../components/icons/IconoResumen';
import IconoClientes from '../components/icons/IconoClientes';
import IconoOrdenesAbiertas from '../components/icons/IconoOrdenesAbiertas';
import IconoStockBajo from '../components/icons/IconoStockBajo';
import Spinner from '../components/Spinner';

export default function Home(){

    const [totalClientes, setTotalClientes] = useState(0);
    const [ordenesAbiertas, setOrdenesAbiertas] = useState([]);
    const [piezasStockBajo, setPiezasStockBajo] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [failedFetch, setFailedFetch]=useState(false);
    
    const styles={
        sectionCommon:"border-2 rounded flex flex-col gap-2 justify-center items-center bg-green-100",
        divSectionResumen:"border border-green-50 p-3 flex flex-col items-center shadow-[0_0_8px_rgba(0,0,0,0.25)]",
    }

    useEffect(()=>{
        cargarResumen();
    },[])

    const cargarResumen = async()=>{
            setFailedFetch(false);
            setCargando(true);
        try{
            const [clientes,ordenes,piezas]=await Promise.all([
                clientesApi.obtenerTodos(),
                ordenesApi.obtenerTodos(),
                piezasApi.obtenerTodos(),
            ]);

            setTotalClientes(clientes.length);

            const abiertas= ordenes.filter((orden)=>
                orden.estado==="RECIBIDO" || orden.estado==="DIAGNOSTICADO"
            )


            setOrdenesAbiertas(abiertas);

            const stockBajo=piezas.filter((pieza)=>pieza.stock<5).length;
            setPiezasStockBajo(stockBajo);


        }catch(error){
            console.error('Error cargando resumen:', error);
            setFailedFetch(true)

        }finally{
            setCargando(false);
        }
        
    }

    const renderError = () => (
        <div className="col-span-2 text-center py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-bold">❌ Error al cargar los datos</p>
                <p className="text-sm">No se pudo conectar con el servidor. Por favor, intenta más tarde.</p>
                <button 
                    onClick={() => {
                        cargarResumen();
                    }}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );


    return (
        <>
            <div className='max-w-40 mx-auto bg-gray-300 rounded-b-xl rounded-t-3xl mb-6'>
                <h1 className='py-2 text-center text-3xl font-bold text-emerald-900'>INICIO</h1>
            </div>
            <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-1`}>
            {/*Resumen numerico(contadores*/}
            {failedFetch?renderError():
            <>
           <section className={`${styles.sectionCommon} px-0`}>
                <div className="w-full">
                    <h2 className="text-xl font-bold text-center mb-4 flex flex-col justify-center items-center py-2"><IconoResumen className='w-10 h-8 text-yellow-500'/>Resumen </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                    <div className={`${styles.divSectionResumen} rounded-tr rounded-br `}>
                            <span className="text-3xl mb-1"><IconoClientes className='text-blue-500 w-12 h-10'/></span>
                            <h3 className="text-sm text-gray-600">Clientes</h3>
                            {cargando ? <Spinner /> : <p className="text-2xl font-bold text-blue-600">{totalClientes}</p>}
                    </div>
                    <div className={`${styles.divSectionResumen} rounded-t`}>
                            <span className="text-3xl mb-1"><IconoOrdenesAbiertas className='w-12 h-10'/></span>
                            <h3 className="text-sm text-gray-600">Órdenes Abiertas</h3>
                            {cargando ? <Spinner /> : <p className="text-2xl font-bold text-yellow-600">{ordenesAbiertas.length}</p>}
                    </div>
                    <div className={`${styles.divSectionResumen} rounded-tl`}>
                            <span className="text-3xl mb-1"><IconoStockBajo className='w-12 h-10 text-yellow-300'/></span>
                            <h3 className="text-sm text-gray-600">Stock Bajo</h3>
                            {cargando ? <Spinner /> : <p className="text-2xl font-bold text-red-600">{piezasStockBajo}</p>}
                    </div>
                </div>
            </section>

                {/*Ultimas ordendes en estado RECIBIDO o Diagnosticado*/}
                <section className={styles.sectionCommon}>
                    <div>
                        <h2>Ordenes Recientes</h2>
                    </div>
                </section>
                
                 {/*Facturacion*/}
                <section className={styles.sectionCommon}>
                    <div>
                        <h2>Facturacion</h2>
                    </div>
                </section>

                {/*Accesos Rapidos*/}
                <section className={styles.sectionCommon}>
                    <div>
                        <h2>Accesos Rapidos</h2>  
                    </div>
                </section>
            </>
            }
                

               

            
            </div>
        </>
    );
}
import { useState, useEffect } from 'react';
import { clientesApi } from '../api/clientes';
import { ordenesApi } from '../api/orden_reparacion';
import { piezasApi } from '../api/piezas';
import IconoResumen from '../components/icons/IconoResumen';
import IconoClientes from '../components/icons/IconoClientes';
import IconoOrdenesAbiertas from '../components/icons/IconoOrdenesAbiertas';
import IconoStockBajo from '../components/icons/IconoStockBajo';
import Spinner from '../components/Spinner';
import StatCard from '../components/StatCard';
import UltimasOrdenes from '../components/UltimasOrdenes';
import RenderErrorNoConnection from '../components/RenderErrorNoConnection';

export default function Home(){

    const [totalClientes, setTotalClientes] = useState(0);
    const [ordenesAbiertas, setOrdenesAbiertas] = useState([]);
    const [piezasStockBajo, setPiezasStockBajo] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [failedFetch, setFailedFetch]=useState(false);
    
    const styles={
        sectionCommon:"border-2 rounded flex flex-col gap-2 justify-center items-center bg-green-100 py-3",
        titSection:"text-emerald-950 text-2xl font-bold text-center",
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


    return (
        <>
            <div className='max-w-40 mx-auto bg-gray-300 rounded-b-xl rounded-t-3xl mb-6'>
                <h1 className='py-2 text-center text-3xl font-bold text-emerald-900'>INICIO</h1>
            </div>
            <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-start`}>
                {/*Resumen numerico(contadores*/}
                {failedFetch?
                    <RenderErrorNoConnection
                        onClick={cargarResumen}
                    />
                :
                <>
                <section className={`${styles.sectionCommon}`}>
                    <div className="w-full">
                        <h2 className= {`${styles.titSection}  mb-4 flex flex-col justify-center items-center py-2`}><IconoResumen className='w-10 h-8 text-yellow-500'/>Resumen </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <StatCard
                            icono={<IconoClientes className='text-blue-500 w-12 h-10'/>}
                            totalItem={totalClientes}
                            cargando={cargando}
                        />
                        <StatCard
                            icono={<IconoOrdenesAbiertas className='w-12 h-10'/>}
                            totalItem={ordenesAbiertas.length}
                            cargando={cargando}
                        />
                        <StatCard
                            icono={<IconoStockBajo className='w-12 h-10 text-red-500'/>}
                            totalItem={piezasStockBajo}
                            cargando={cargando}
                        />
                    </div>
                </section>

                    {/*Ultimas ordendes en estado RECIBIDO o Diagnosticado*/}
                    <section className={`${styles.sectionCommon}`}>
                        <div>
                            <h2 className={`${styles.titSection}`}>Ordenes Recientes</h2>
                        </div>
                        <ul className='flex gap-4 flex-col md:flex-row md:flex-wrap px-4 justify-center' >
                            <UltimasOrdenes
                                ordenesAbiertas={ordenesAbiertas}
                            />
                        </ul>
                        
                    </section>
                    
                    {/*Facturacion*/}
                    <section className={styles.sectionCommon}>
                        <div>
                            <h2 className={`${styles.titSection}`}>Facturacion</h2>
                        </div>
                    </section>

                    {/*Accesos Rapidos*/}
                    <section className={styles.sectionCommon}>
                        <div>
                            <h2 className={`${styles.titSection}`}>Accesos Rapidos</h2>  
                        </div>
                    </section>
                </>
                }    
            </div>
        </>
    );
}
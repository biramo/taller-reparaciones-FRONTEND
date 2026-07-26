import IconoResumen from '../components/icons/IconoResumen';
import IconoClientes from '../components/icons/IconoClientes';
import IconoOrdenesAbiertas from '../components/icons/IconoOrdenesAbiertas';
import IconoStockBajo from '../components/icons/IconoStockBajo';
import Spinner from '../components/ui/Spinner';
import StatCard from '../components/ui/StatCard';
import UltimasOrdenes from '../components/UltimasOrdenes';
import RenderErrorNoConnection from '../components/ui/RenderErrorNoConnection';
import { useDashboard } from '../hooks/useDashboard';
import { useMemo } from 'react';

const CLASES={
        sectionCommon:"border-2 rounded flex flex-col gap-2 justify-center items-center bg-green-100 py-3",
        titSection:"text-emerald-950 text-2xl font-bold text-center",
    };

export default function Home(){

    const {totalClientes,ordenesAbiertas,totalStockBajo,cargando,failedFetch,recargar}=useDashboard();

    

    return (
        <>
            <div className='max-w-40 mx-auto bg-gray-300 rounded-b-xl rounded-t-3xl mb-6'>
                <h1 className='py-2 text-center text-3xl font-bold text-emerald-900'>INICIO</h1>
            </div>
            <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-start`}>
                {/*Resumen numerico(contadores*/}
                {failedFetch?
                    <RenderErrorNoConnection
                        onClick={recargar}
                    />
                :
                <>
                <section className={`${CLASES.sectionCommon}`}>
                    <div className="w-full">
                        <h2 className= {`${CLASES.titSection}  mb-4 flex flex-col justify-center items-center py-2`}><IconoResumen className='w-10 h-8 text-yellow-500'/>Resumen </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <StatCard
                            title="Clientes"
                            icono={<IconoClientes className='text-blue-500 w-12 h-10'/>}
                            totalItem={totalClientes}
                            cargando={cargando}
                        />
                        <StatCard
                            title="Ordenes"
                            icono={<IconoOrdenesAbiertas className='w-12 h-10'/>}
                            totalItem={ordenesAbiertas.length}
                            cargando={cargando}
                        />
                        <StatCard
                            title="Stock bajo"
                            icono={<IconoStockBajo className='w-12 h-10 text-red-500'/>}
                            totalItem={totalStockBajo}
                            cargando={cargando}
                        />
                    </div>
                </section>

                    {/*Ultimas ordendes en estado RECIBIDO o Diagnosticado*/}
                    <section className={`${CLASES.sectionCommon}`}>
                        <div>
                            <h2 className={`${CLASES.titSection}`}>Ordenes Recientes</h2>
                        </div>
                        <ul className='flex gap-4 flex-col md:flex-row md:flex-wrap px-4 justify-center' >
                            <UltimasOrdenes
                                ordenesAbiertas={ordenesAbiertas}
                            />
                        </ul>
                        
                    </section>
                    
                    {/*Facturacion*/}
                    <section className={CLASES.sectionCommon}>
                        <div>
                            <h2 className={`${CLASES.titSection}`}>Facturacion</h2>
                        </div>
                    </section>

                    {/*Accesos Rapidos*/}
                    <section className={CLASES.sectionCommon}>
                        <div>
                            <h2 className={`${CLASES.titSection}`}>Accesos Rapidos</h2>  
                        </div>
                    </section>
                </>
                }    
            </div>
        </>
    );
}
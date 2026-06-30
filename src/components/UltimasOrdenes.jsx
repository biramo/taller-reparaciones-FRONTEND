
const MAXIMO_ORDENES=6;

export default function UltimasOrdenes({ordenesAbiertas}){
     
    const stylesUltimasOrdenes={
        divInfo:"flex gap-2",
        titDiv:"font-bold text-lg"
    }
    
    const ultimasOrdenes= [...ordenesAbiertas].sort((a,b)=> new Date(b.fechaEntrada)-new Date(a.fechaEntrada))
        .slice(0,MAXIMO_ORDENES);
    

    return(
            ultimasOrdenes.map((orden)=>{
                return (
                <li
                    key={orden.id}
                    className='border px-2 py-2 rounded shadow-[0_0_8px_rgba(0,0,0,0.25)]  md:w-60 '
                >  
                    <div className={`${stylesUltimasOrdenes.divInfo} text-xl flex flex-wrap justify-center `}>
                        <h3 className="font-bold text-emerald-800 text-center">Id del pedido:</h3>
                        <span className='text-emerald-950'>{orden.id}</span>
                    </div>
                    <div>
                        <div>
                            <h4 className={stylesUltimasOrdenes.titDiv}>Estado:</h4>
                            <span>{orden.estado}</span>
                        </div>
                        <div>
                            <h4 className={stylesUltimasOrdenes.titDiv}>Tecnico Responsable:</h4>
                            <span>{orden.nombreTecnico}</span>
                        </div>
                        <div>
                            <h4 className={stylesUltimasOrdenes.titDiv}>Dispositivo:</h4>
                            <span>{orden.marcaModeloDispositivo}</span>
                        </div>
                        <div>
                            <h4 className={stylesUltimasOrdenes.titDiv}>Descripcion:</h4>
                            <span> {orden.descripcionProblema} </span>
                        </div>
                    </div>
                </li> )
            })
        )    
            
            
}
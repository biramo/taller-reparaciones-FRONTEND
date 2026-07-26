import InfoRow from "./ui/InfoRow";

const MAXIMO_ORDENES=6;

export default function UltimasOrdenes({ordenesAbiertas}){
     
    const clases={
        divInfo:"flex gap-2",
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
                    <div className={`${clases.divInfo} text-xl flex flex-wrap justify-center `}>
                        <h3 className="font-bold text-emerald-800 text-center">Id del pedido:</h3>
                        <span className='text-emerald-950'>{orden.id}</span>
                    </div>
                    <div>
                        <InfoRow
                            title="Estado:"
                            value={orden.estado}
                        />
                        <InfoRow  
                            title="Tecnico Responsable:"
                            value={orden.nombreTecnico}
                        />
                         <InfoRow  
                            title="Dispositivo:"
                            value={orden.marcaModeloDispositivo}
                        />
                         <InfoRow  
                            title="Descripcion:"
                            value={orden.descripcionProblema}
                        />
                    </div>
                </li> )
            })
        )            
}
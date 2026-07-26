import Spinner from "./Spinner";
import { twMerge } from "tailwind-merge"
import { clsx } from "clsx";

export default function StatCard({
    title,
        icono,
        totalItem, 
        cargando=false,
        color="text-gray-900",
        className    
    }){

    const styles ="border border-green-50 p-3 flex flex-col items-center shadow-[0_0_8px_rgba(0,0,0,0.25)]";


    return (

        <div className={twMerge(
                clsx(
                    styles,
                    className
                )
            )}>
            <span className="text-3xl mb-1">{icono}</span>
            <h3 className="text-green-600">{title}</h3>
            {cargando ? <Spinner /> : <p className={`text-2xl font-bold ${color}`}>{totalItem}</p>}
        </div>
    )
}
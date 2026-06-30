import { useNavigate } from "react-router-dom"
import {ROUTES} from '../constants/routes';

export default function Sidebar({active}){

    const navigate=useNavigate();
   
    const ITEMS_MENU = [
        { label: "Clientes", ruta: ROUTES.CLIENTES },
        { label: "Técnicos", ruta: ROUTES.TECNICOS },
        { label: "Órdenes", ruta: ROUTES.ORDENES },
        { label: "Piezas", ruta: ROUTES.PIEZAS },
        { label: "Dispositivos", ruta: ROUTES.DISPOSITIVOS },
        { label: "Facturas", ruta: ROUTES.FACTURAS },
    ];

    return(
        <aside className={` bg-gray-200 mx-1 my-1  border-4 border-gray-700 flex flex-col justify-between transition-all duration-300 h-105 md:h-120 ${active ? "w-45 md:w-90  " : "w-0 p-0 opacity-0 border-0 mx-0"} `}> 
            <div className=" px-4 py-3 border-b-2 border-emerald-950 bg-emerald-950 flex flex-col gap-2 w-full shrink-0">
                <h3 className="font-extrabold text-white">GESTIÓN DEL TALLER</h3>
                <p className="font-semibold text-green-300">Bienvenido, Usuario</p>
            </div>
            <nav className="flex-grow h-full w-full">
                <ul className="flex flex-col h-full w-full">
                   {ITEMS_MENU.map((item) => (
                        <li
                        key={item.ruta}
                        onClick={() => navigate(item.ruta)}
                        className="border-b border-t bg-gray-800 w-full flex flex-1 justify-center 
                        min-h-0 text-white cursor-pointer hover:bg-gray-600 overflow-hidden items-center"
                        >
                        {item.label}
                        </li>
                    ))} 
                </ul>
            </nav>
        </aside>
    )
}
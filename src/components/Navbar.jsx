import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth';
import UserIcon from "./icons/UserIcon";
import BellIcon from "./icons/BellIcon";
import logo from '../assets/icons/Logo.svg'



export default function Navbar() {
    const {logout}=useAuth();
    const navigate=useNavigate();
    const [activeDropDown, setActiveDropdown]=useState(false);

    const transitionDropdown = "transition-all duration-300 ease-in-out overflow-hidden";
    const transitionBg="transition-colors duration-300 ease-in-out";

    const styles={
        navClass:"flex flex-wrap md:flex-nowrap justify-between gap-2 items-center py-4 px-4 border-b border-green-300 bg-emerald-950 text-emerald-50",
        
        elementNav:"bg-emerald-50 px-4 py-2 rounded text-emerald-900",

        elementNavInteractive:`hover:bg-emerald-200 hover:text-emerald-950 ${transitionBg}`,

        dropDownActive: `absolute right-0 top-16 bg-gray-800 border-4 border-emerald-900 py-6 px-2 flex flex-col gap-3 font-bold items-center rounded ${transitionDropdown} max-h-60 opacity-100`,
        
        dropDown:`absolute right-0 top-16 bg-emerald-50 border-gray-700 flex flex-col gap-3 items-center rounded p-0 opacity-0 border-0 mx-0 max-h-0 pointer-events-none ${transitionDropdown}` ,

        liElement: `rounded bg-white px-4 py-1.5 text-emerald-950 w-full text-center hover:bg-emerald-200 cursor-pointer ${transitionDropdown}`,

        logoutElement: `${transitionBg} bg-red-500 hover:bg-red-700 px-2 py-1.5 cursor-pointer rounded text-white`
    }
    
    return (
    <nav className={styles.navClass}>
      {/* LOGO / APP NAME */}
      <div className={`${styles.elementNav} ${styles.elementNavInteractive} cursor-pointer`}
        onClick={()=>navigate("/")}
      >
        <img src={logo} alt="Taller reparaciones "/>
      </div>

      {/* SEARCH GLOBAL */}
        <input
         className={`${styles.elementNav} w-full md:max-w-md`}
          type="text"
          placeholder="Buscar cliente, orden, pieza..."
        />

      {/* NOTIFICACIONES */}
      <div className={styles.elementNav}>
        <BellIcon/>
      </div>

      {/* USER MENU */}
      <div  className="relative">

        <button className={`${styles.elementNav} ${styles.elementNavInteractive} cursor-pointer flex items-center gap-2`}
            onClick={()=>setActiveDropdown(!activeDropDown)}
        >
          <UserIcon/>
          <span>Perfil</span>
        </button>

        {/* DROPDOWN */}
        <ul className={activeDropDown?styles.dropDownActive:styles.dropDown}>
          <li className={styles.liElement}>Mi perfil</li>
          <li className={styles.liElement}>Configuración</li>
          <li className="text-white">──────────</li>
          <li
            className={styles.logoutElement}
            onClick={()=>logout()}
          >Cerrar sesión</li>
        </ul>

      </div>

    </nav>
  );
}
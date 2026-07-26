// layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MenuIconOpen from "../components/icons/MenuIconOpen"
import MenuIconClose from "../components/icons/MenuIconClose";
import { useState } from "react";

export default function AppLayout() {
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* 1. Header fijo arriba */}
      <Header />

      {/* 2. Cuerpo principal que se estira horizontalmente */}
      <div className="flex flex-1 relative">
        
        {/* Sidebar al extremo izquierdo */}
        <Sidebar active={active} />

        {/* Contenedor del Main: 
          - grow: ocupa todo el ancho restante.
          - min-w-0: CRUCIAL. Evita que el main se desborde infinitamente si la tabla es grande.
          - flex flex-col: para alinear el botón del menú y el contenido de la página de forma limpia.
        */}
        <main className="grow min-w-0 p-4 flex flex-col gap-4 ">
          
          {/* El botón del aside */}
          <button 
            className="w-12 h-12 bg-gray-200 flex items-center justify-center hover:bg-gray-400 cursor-pointer rounded-md shrink-0"
            onClick={() => setActive(!active)}
          >
            {active ? <MenuIconClose className="w-6"/> : <MenuIconOpen className="w-6"/>}
          </button>

          {/* Aquí es donde se renderiza Clientes, Órdenes, etc. */}
          <div className="grow flex flex-col gap-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* 3. Footer fijo abajo */}
      <Footer />
    </div>
  );
}
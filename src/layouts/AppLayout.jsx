// layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MenuIconOpen from "../components/icons/MenuIconOpen"
import MenuIconClose from "../components/icons/MenuIconClose";
import { useState } from "react";

//Crea la plantilla de las paginas
//todas igual cambiando el main
export default function AppLayout() {

  const [active, setActive]=useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />
       <button className="w-18 h-12 bg-gray-200 flex items-center justify-center hover:bg-gray-400 cursor-pointer rounded-sm"
        onClick={()=>setActive(!active)}
       >
        {active?(<MenuIconClose className="w-12"/>):(<MenuIconOpen className="w-12"/>)}
       </button>
      <div className="flex flex-1">
       
        <Sidebar active={active} />

        <main className="grow p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
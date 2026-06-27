import { useBackendStatus } from "../hooks/useBackendStatus";

export default function Footer() {
  const año = new Date().getFullYear();
  const conectado = useBackendStatus();

  return (
    <footer className="flex-wrap bg-emerald-950 text-emerald-200 text-sm px-6 py-3 flex justify-between gap-2 items-center">
      <span className="text-center">© {año} Taller Reparaciones</span>
      <span className="text-center">v1.0.0</span>
      <div className="flex py-2 px-4 rounded-full bg-emerald-50 gap-2">
        <span className={`border w-5 h-5 rounded-full ${conectado?"bg-green-400":"bg-red-400"} ` }/>
        <span
          className={`text-emerald-950 `}
        >
        {conectado?"Aplicacion en linia": "Aplicacion sin conexion"}</span>
      </div>
    </footer>
  );
}
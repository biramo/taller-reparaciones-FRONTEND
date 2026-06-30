export default function renderErrorNoConnection({onClick}){
    return (
        <div className="col-span-2 text-center py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-bold">❌ Error al cargar los datos</p>
                <p className="text-sm">No se pudo conectar con el servidor. Por favor, intenta más tarde.</p>
                <button 
                    onClick={() => {
                        onClick();
                    }}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor pointer"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
}
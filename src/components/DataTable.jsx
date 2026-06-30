// src/components/DataTable.jsx
export default function DataTable({ columnas, datos, onEliminar }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left">
          {columnas.map((col) => (
            <th key={col.key} className="py-2">{col.label}</th>
          ))}
          <th className="py-2"></th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr key={item.id} className="border-b">
            {columnas.map((col) => (
              <td key={col.key} className="py-2">
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
            <td className="py-2 text-right">
              <button onClick={() => onEliminar(item)} className="text-red-600 hover:underline">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
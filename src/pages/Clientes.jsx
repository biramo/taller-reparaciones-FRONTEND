import { useState, useEffect } from 'react';
import { clientesApi } from '../api/clientes';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await clientesApi.obtenerTodos();
      setClientes(data);
    } catch (err) {
      console.log(err)
      setError("No se ha podido obtener el recurso");
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await clientesApi.crear({ nombre, telefono, email });
      setNombre('');
      setTelefono('');
      setEmail('');
      cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await clientesApi.eliminar(id);
      cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Clientes</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Añadir
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Nombre</th>
              <th className="py-2">Teléfono</th>
              <th className="py-2">Email</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b">
                <td className="py-2">{cliente.nombre}</td>
                <td className="py-2">{cliente.telefono}</td>
                <td className="py-2">{cliente.email}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => handleEliminar(cliente.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
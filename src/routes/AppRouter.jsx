import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Clientes from '../pages/Clientes';
import Tecnicos from '../pages/Tecnicos';
import Ordenes from '../pages/Ordenes';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import { ROUTES } from '../constants/routes';
import AppLayout from "../layouts/AppLayout";
import Piezas from '../pages/Piezas';
import Dispositivos from '../pages/Dispositivios';
import Facturas from '../pages/Facturas';


export default function AppRouter() {
  const location = useLocation();

  return (
    <>

      <Routes>
        {/* públicas */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* privadas con layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CLIENTES} element={<Clientes />} />
        <Route path={ROUTES.TECNICOS} element={<Tecnicos />} />
        <Route path={ROUTES.ORDENES} element={<Ordenes />} />
        <Route path={ROUTES.PIEZAS} element={<Piezas/>}/>
        <Route path={ROUTES.DISPOSITIVOS} element={<Dispositivos/>}/>
        <Route path={ROUTES.FACTURAS} element={<Facturas/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
      </Routes>

    </>
  );
}
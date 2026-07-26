import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';

export default function ProtectedRoute({ children }) {
  const {token}=useAuth();
  

  if(!token){
   return <Navigate to="/login" replace/>
  }

  return children;
}

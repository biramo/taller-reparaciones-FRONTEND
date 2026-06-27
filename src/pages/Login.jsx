import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import Input from '../components/Input'
import Button from "../components/Button";
import H1 from "../components/H1";
import { Link} from 'react-router-dom';
import Spinner from "../components/Spinner";
import AuthForm from "../components/AuthForm";
import { ROUTES } from "../constants/routes";
export default function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("");
  const [loading, setLoading]=useState(false);


  if(token){
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setLoading(true);
    const ok = await login(username, password);
      if(ok){
          navigate(ROUTES.HOME);
      };

    }catch(err){
      setError(err);
      console.log("Error:"+err);

    }finally{
      setLoading(false);
    }
    
  };

  return (
  <AuthForm
    title="BIENVENIDO"
    onSubmit={handleSubmit}
    loading={loading}
    error={error}
    submitText="Entrar"
    fields={[
      {
        name: "username",
        placeholder: "usuario",
        value: username,
        onChange: (e) => setUsername(e.target.value),
      },
      {
        name: "password",
        type: "password",
        placeholder: "password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
      },
    ]}
    footer={
      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?
        <Link to="/register" className="text-blue-600 hover:underline">
          {" "}Regístrate
        </Link>
      </p>
    }
  />
);
}
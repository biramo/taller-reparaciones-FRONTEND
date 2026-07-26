import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import Input from '../components/ui/Input'
import Button from "../components/ui/Button";
import H1 from "../components/ui/H1";
import { Link} from 'react-router-dom';
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
      setError("")
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
        label:"Usuario",
        placeholder: "usuario",
        value: username,
        onChange: (e) => setUsername(e.target.value),
      },
      {
        name: "password",
        label:"Contraseña",
        type: "password",
        placeholder: "password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
      },
    ]}
    footer={
      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?
        <Link to={ROUTES.REGISTER} className="text-blue-600 hover:underline">
          {" "}Regístrate
        </Link>
      </p>
    }
  />
);
}
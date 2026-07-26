import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { Link} from 'react-router-dom';
import { ROUTES } from "../constants/routes";

export default function Register(){

  const { register,login, token } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword]=useState("");
  const [error, setError]=useState("");
  const [loading, setLoading]=useState(false);


  if(token){
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setError("");

        if (password !== verifyPassword) {
        setError("Las contraseñas no coinciden");
        return;

        setLoading(true);
    }
    const registered = await register(username, password);

    if (!registered) return;

    const loggedIn = await login(username, password);

    navigate(
    loggedIn ? ROUTES.HOME : ROUTES.LOGIN
    );
        
    
    
    }catch(err){
      setError(err.message || "Error al registrarse");
      console.log("Error:"+err);

    }finally{
      setLoading(false);
    }
    
  };

    return (
  <AuthForm
    title="REGISTRATE"
    onSubmit={handleSubmit}
    loading={loading}
    error={error}
    submitText="Registrarse"
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
      {
        name:"repeat-password",
        label:"Repite la contraseña",
        type:"password",
        placeholder:"repeat the password",
        value:verifyPassword,
        onChange:(e)=>setVerifyPassword(e.target.value)

      }
    ]}
    footer={
      <p className="text-sm text-gray-600">
        ¿tienes cuenta?
        <Link to={ROUTES.LOGIN} className="text-blue-600 hover:underline">
          {" "}Inicia Sesion
        </Link>
      </p>
    }
  />
);
}
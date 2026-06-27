import { createContext, useEffect, useState } from "react";
import { authApi } from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider({children}){

    //Cargamos token si existe
    const [token, setToken]=useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (token) {
        localStorage.setItem('token', token);
        } else {
        localStorage.removeItem('token');
        }
     }, [token]);

    const login = async (username, password) => {
      try {
        const data = await authApi.login(username, password);

        if (!data || !data.token) {
        throw new Error("Token no recibido del backend");
        }

            setToken(data.token);
            return true;
        } catch (error) {
            console.error("Error login:", error);
            return false;
        }
    };

    const register = async (username, password) => {
        try {
            const data = await authApi.register(username, password);

            if (!data || !data.token) {
            throw new Error("Token no recibido del backend");
            }

            setToken(data.token);
            return true;
        } catch (error) {
            console.error("Error register:", error);
            return false;
        }
        };

     const logout = () => {
        setToken(null);
    };

    return (
    <AuthContext.Provider value={{ token, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );

}

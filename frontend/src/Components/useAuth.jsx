import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montarse el componente, intentar obtener el token del localStorage
    const token = localStorage.getItem("token");

    if (token && token.trim() !== "") {
      try {
        // Decodificar el token para obtener la información del usuario
        const decodedToken = jwt_decode.jwtDecode(token);
        setUser({
          token,
          usuario: {
            id_usuario: decodedToken.id_usuario,
            email: decodedToken.email,
            admin: decodedToken.admin,
            role: decodedToken.role,
          },
        });
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    }
  }, []);


  const logout = () => {
    // Eliminar el token o la información del usuario del localStorage
    localStorage.removeItem("token");
    console.log('Logout');

    // Eliminar el usuario del estado local
    setUser(null);
    console.log('isAuthenticated ha cambiado', isAuthenticated());
  };

  const isAuthenticated = () => {
    // Verificar si el usuario está autenticado
    return user && user.token;
  };

  return { user, logout, isAuthenticated };
};

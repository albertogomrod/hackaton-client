import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // nuestros estados de auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // nuestras funciones de auth

  // esta funcion que va a contactar al backend, para validar el Token
  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      console.log("Token es valido");
      console.log(response);
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log("Token invalido o no existe");
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    authenticateUser(); // autentica el token del usuario cuando vista la pagina o refresca la pagina
  }, []); // componentDidMount

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <h2>Cargando...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };

import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.services";
import { SpinnerDotted } from "spinners-react";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      if (response.data.role === "company") {
        setIsCompany(true);
      } else if (response.data.role === "admin") {
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser,
    isCompany,
    isAdmin,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <SpinnerDotted
          size={50}
          thickness={179}
          speed={75}
          color="rgba(172, 57, 57, 1)"
        />
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

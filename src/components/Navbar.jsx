import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser, isAdmin, isCompany } = useContext(AuthContext);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isLoggedIn === true) {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Mi perfil</NavLink>
        <NavLink to="/login">Próximos hackatones</NavLink>
        <NavLink to="/">Tutoriales</NavLink>
        <NavLink to="/">Mapa</NavLink>
        <NavLink to="/">Calendario</NavLink>
        { isCompany === true ? <NavLink to="/">Crear un hackaton</NavLink> : null}
        { isAdmin === true ? <NavLink to="/">Crear un tutorial</NavLink> : null}
        <span onClick={handleLogout}>Cerrar sesion</span>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );
  }
}

export default Navbar;

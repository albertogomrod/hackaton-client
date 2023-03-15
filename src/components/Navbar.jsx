import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const params = useParams()

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
        <NavLink to="/profile">Mi perfil</NavLink>
        <NavLink to="/hackaton-list">Próximos hackatones</NavLink>
        <NavLink to="/tutorial-list">Tutoriales</NavLink>
        <NavLink to="/hackaton/map">Mapa</NavLink>
        <NavLink to="/">Calendario</NavLink>
        { isCompany === true ? <NavLink to="/hackaton/create">Crear un hackaton</NavLink> : null}
        { isAdmin === true ? <NavLink to="/tutorial/create">Crear un tutorial</NavLink> : null}
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

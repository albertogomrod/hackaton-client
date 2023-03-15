import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const params = useParams();

  const { isLoggedIn, authenticateUser, isAdmin, isCompany } =
    useContext(AuthContext);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isLoggedIn === true) {
    return (
      <div className="navbarr">
        <NavLink className="navlink" to="/">
          HACKATON APP
        </NavLink>

        <NavLink className="navlink" to="/hackaton-list">
          Próximos hackatones
        </NavLink>
        <NavLink className="navlink" to="/tutorial-list">
          Tutoriales
        </NavLink>
        <NavLink className="navlink" to="/hackaton/map">
          Mapa
        </NavLink>
        {isCompany === true ? (
          <NavLink className="navlink" to="/hackaton/create">
            Crear un hackaton
          </NavLink>
        ) : null}
        {isAdmin === true ? (
          <NavLink className="navlink" to="/tutorial/create">
            Crear un tutorial
          </NavLink>
        ) : null}

        <NavLink className="navlink" id="miperfil" to="/profile">
          Mi perfil
        </NavLink>
        <span onClick={handleLogout}>Cerrar sesion</span>
      </div>
    );
  } else {
    return (
      <div className="navbarr">
        <NavLink className="navlink" to="/">
          Home
        </NavLink>
        <NavLink className="navlink" to="/signup">
          Signup
        </NavLink>
        <NavLink className="navlink" to="/login">
          Login
        </NavLink>
      </div>
    );
  }
}

export default Navbar;

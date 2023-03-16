import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";
import logoblanco from "../assets/logo-blanco.png"

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
       <NavLink to="/"><img class="logo" src={logoblanco} alt="logo-hackaton" /> </NavLink> 
        {/* <NavLink className="navlink" to="/">
          HACKATON APP
        </NavLink> */}
        <img className="burger" src="" alt="burger" />
        {/* {document.body.classList.toggle('open')} */}
        <div className="menu-items">
          <div className="menu menu-left">
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
          </div>
          <div className="menu menu-right">
            <span className="badge"></span>
            <NavLink className="navlink" to="/profile">
              Mi perfil
            </NavLink>
            <NavLink id= "logout" onClick={handleLogout}>Cerrar sesion</NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbarr">
        <div className="menu-items">
          <div className="menu menu-left">
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
        </div>
      </div>
    );
  }
}

export default Navbar;

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";
import logoblanco from "../assets/logo-blanco.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavBar() {
  const navigate = useNavigate();

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
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/">
            <img class="logo" src={logoblanco} alt="logo-hackaton" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
            </Nav>
            <Nav>
              <NavLink className="navlink" to="/profile">
                Mi perfil
              </NavLink>
              <NavLink id="logout" onClick={handleLogout}>
                Cerrar sesion
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <div className="navbarr">
        <NavLink to="/">
          <img class="logo" src={logoblanco} alt="logo-hackaton" />{" "}
        </NavLink>
        <div className="menu-items">
          <div className="menu menu-right">
            <span className="badge"></span>

            <NavLink className="navlink" to="/signup">
              Regístro
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

export default NavBar;

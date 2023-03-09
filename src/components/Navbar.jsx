import { NavLink, useNavigate } from "react-router-dom";
function Navbar() {


    const navigate = useNavigate()
    // LOGOUT
    // const handleLogout = () => {
    //     //Eliminar el token
    //     localStorage.removeItem("authToken")
    //     //Cambiar los valores de los estados
    //     authenticUser()
    //     //Redirecciona a home
    //     navigate("/")
    //   }

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>

    </div>
  );
}

export default Navbar;

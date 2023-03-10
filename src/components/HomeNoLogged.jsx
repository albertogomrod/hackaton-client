import { Link } from "react-router-dom";

function HomeNoLogged() {
  return (
    <div>
        <h1>Bienvenido a Hackaton!</h1>
        <div>
        <h4><Link to="/signup">Registrate gratis</Link></h4>
        </div>
        <div>
        <h4>Si ya tienes cuenta <Link to="/login">inicia sesión</Link></h4>
        </div>
    </div>
  )
}

export default HomeNoLogged
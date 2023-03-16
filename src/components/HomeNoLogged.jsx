import { Link } from "react-router-dom";
import logorosa from "../assets/jacaton-rosa.png"

function HomeNoLogged() {
  return (
    <div id= "homeNoLogg">
        <img className= "logoHome" src={logorosa} alt="logo-jacaton" />
        <h2>¡Bienvenidos a la comunidad más grande de Hackathones en España!</h2>
        <div>
        <h5 id="homeParticipa" className="bold">¿Tienes ganas de participar o quieres organizar tu propio evento?</h5>
        <h4 className="bold">¡Estás en el sitio adecuado!</h4>
        <h4><Link to="/signup">Regístrate</Link></h4>
        </div>
        <div>
        <h4 id="conCuenta">Si ya tienes cuenta, <Link to="/login">inicia sesión.</Link></h4>
        </div>
    </div>
  )
}

export default HomeNoLogged
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services.js";

import { AuthContext } from "../../context/auth.context.js";
import { Link } from "react-router-dom";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleLogin = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username: username,
      password: password,
    };

    try {
      const response = await loginService(userCredentials);
      localStorage.setItem("authToken", response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response.status === 411) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="loginCentradito">
      <br />
      <button onClick={() => navigate(-1)}>Atrás</button>
      <h1 className="bold">Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <label className="label">Nombre de usuario:</label>
        <br />
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label className="label">Contraseña:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button id="buttonLoggin" type="submit">
          Iniciar sesión
        </button>
        <br />
        <h6>
          ¿Aún no te has registrado?{" "}
          <Link className="links" to="/signup">
            Hazlo aquí.
          </Link>{" "}
        </h6>
      </form>
      <br />
    </div>
  );
}

export default Login;

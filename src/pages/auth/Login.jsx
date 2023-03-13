import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services.js";

import { AuthContext } from "../../context/auth.context.js"

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
      console.log("Token Validado");

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
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

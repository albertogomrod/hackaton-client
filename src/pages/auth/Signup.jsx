import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleComunidadAutonomaChange = (e) => setComunidadAutonoma(e.target.value);


  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      username,
      password,
      comunidadAutonoma,
    };
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      //Determinamos el tipo de error que recibimos, y actuar diferente
      if (error.response.status === 400) {
        seterrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Nombre de usuario:</label>
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

        <label>Comunidad Autónoma:</label>
        <input
          type="comunidadAutonoma"
          name="comunidadAutonoma"
          value={comunidadAutonoma}
          onChange={handleComunidadAutonomaChange}
        />

        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

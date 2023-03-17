import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import comunidadesAutonomas from "../../utils/comunidades";
import nivel from "../../utils/nivel";
import tecnologias from "../../utils/tecnologias";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [tech, setTech] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("normal");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleComunidadAutonomaChange = (e) =>
    setComunidadAutonoma(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      username,
      password,
      comunidadAutonoma,
      level,
      role,
      tech,
    };
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        seterrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="loginCentradito">
      <br />
      <button onClick={() => navigate(-1)}>Atrás</button>
      <h1 className="bold">Registro</h1>
      <form onSubmit={handleSignup}>
        <label className="label">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label className="label">Nombre de usuario:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label className="label">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <label className="label" htmlFor="comunidadAutonoma">
          Comunidad Autónoma:{" "}
        </label>
        <select
          name="comunidadAutonoma"
          value={comunidadAutonoma}
          onChange={handleComunidadAutonomaChange}
        >
          <option value="">-- Seleccione una comunidad --</option>
          {comunidadesAutonomas.map((eachComunidadAutonoma) => (
            <option value={eachComunidadAutonoma} key={eachComunidadAutonoma}>
              {eachComunidadAutonoma}
            </option>
          ))}
        </select>

        <br />

        <label className="label" htmlFor="tech">
          ¿Cuál es tu tecnología favorita?:{" "}
        </label>
        <select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </select>

        <br />

        <label className="label" htmlFor="level">
          ¿Cuál es tu nivel?{" "}
        </label>
        <select name="level" value={level} onChange={handleLevelChange}>
          <option value="">- Seleccione un nivel de experiencia -</option>
          {nivel.map((eachNivel) => (
            <option value={eachNivel} key={eachNivel}>
              {eachNivel}
            </option>
          ))}
        </select>

        <br />

        <label className="label" htmlFor="role">
          ¿Qué tipo de usuario eres?
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="role"
            value="normal"
            checked={role === "normal"}
            onChange={handleRoleChange}
          />
          Usuario Normal
        </label>
        <br />
        <label className="label">
          <input
            type="checkbox"
            name="role"
            value="company"
            checked={role === "company"}
            onChange={handleRoleChange}
          />
          Compañía
        </label>
        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button id="buttonAuth" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Signup;

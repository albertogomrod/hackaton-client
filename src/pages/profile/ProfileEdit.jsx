import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getProfileService,
  editProfileService,
} from "../../services/profile.services";

function ProfileEdit() {
  const params = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [tech, setTech] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleComunidadAutonomaChange = (event) =>
    setComunidadAutonoma(event.target.value);
  const handleTechChange = (event) => setTech(event.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProfileService();
      const { username, email, password, comunidadAutonoma, tech } =
        response.data;
      setComunidadAutonoma(comunidadAutonoma);
      setPassword(password);
      setEmail(email);
      setUsername(username);
      setTech(tech);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedProfile = {
        username: username,
        email: email,
        password: password,
        comunidadAutonoma: comunidadAutonoma,
        tech: tech,
      };

      await editProfileService(updatedProfile);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Editar perfil de usuario</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario: </label>
        <input
          type="text"
          name="username"
          onChange={handleUsernameChange}
          value={username}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        <br />

        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <br />

        <label htmlFor="comunidadAutonoma">Comunidad Autónoma: </label>
        <input
          type="text"
          name="comunidadAutonoma"
          onChange={handleComunidadAutonomaChange}
          value={comunidadAutonoma}
        />
        <br />

        <label htmlFor="tech">Tecnologías: </label>
        <input
          type="text"
          name="tech"
          onChange={handleTechChange}
          value={tech}
        />
        <br />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default ProfileEdit;

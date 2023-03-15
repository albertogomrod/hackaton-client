import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getProfileService,
  editProfileService,
} from "../../services/profile.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import Modal from "../../components/Modal";

function ProfileEdit() {
  const params = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [tech, setTech] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
    setModalMessage("¿Guardar cambios?");
  };

  const handleConfirmModal = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = {
        username,
        email,
        password,
        comunidadAutonoma,
        tech
      };
      await editProfileService(updatedProfile);
      setShowModal(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h3>Editar perfil de usuario</h3>
      <button onClick={() => navigate(-1)}>← Back</button>
      <form>
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

        <label htmlFor="tech">Tecnología: </label>
        <select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </select>
        <br />

        <button type="submit" onClick={handleShowModal}>
          Guardar cambios
        </button>
        <Modal
          show={showModal}
          message={modalMessage}
          onConfirm={handleConfirmModal}
          onCancel={handleCancelModal}
        />
      </form>
    </div>
  );
}

export default ProfileEdit;

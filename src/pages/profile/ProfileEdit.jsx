import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getProfileService,
  editProfileService,
} from "../../services/profile.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import Modal from "../../components/Modal";
import Form from "react-bootstrap/Form";
import CambiarPassword from "../../components/CambiarPassword";

function ProfileEdit() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [tech, setTech] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState("block")
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
  
  const handleCancelChangePassword = () => {
    setShowChangePassword(false)
    setShowButton("block")
  }

  const handleShowChangePassword = () => {
    setShowChangePassword(true)
    setShowButton("none")
  }

  const handleShowModalChangePassword = () => {
    setShowModal(true);
    setModalMessage("¿Cambiar contraseña?");
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
        tech,
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
    <div
      class="create-hackaton"
      style={{
        marginTop: "30px",
        marginBottom: "100px",
        backgroundColor: "#ffc3a1",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <button onClick={() => navigate(-1)}>Atrás</button>
      <h3 style={{ marginTop: "20px" }}>Editar perfil de usuario</h3>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Nombre de usuario: </Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={handleUsernameChange}
          value={username}
        />
        <br />
        <Form.Label htmlFor="email">Email: </Form.Label>
        <Form.Control
          type="text"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        <br />

        <Form.Label htmlFor="password">
          Contraseña:{" "}
          <button onClick={handleShowChangePassword} style={{ marginBottom: "15px", display: showButton }}>Cambiar contraseña</button>{" "}
        </Form.Label>
        <br />

        <CambiarPassword
          show={showChangePassword}
          onConfirm={handleShowModalChangePassword}
          onCancel={handleCancelChangePassword}   
          />

        {/* <Form.Label htmlFor="password">Contraseña: </Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <br /> */}

        <Form.Label htmlFor="comunidadAutonoma">
          Comunidad Autónoma:{" "}
        </Form.Label>
        <Form.Select
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
        </Form.Select>
        <br />

        <Form.Label htmlFor="tech">Tecnología favorita: </Form.Label>
        <Form.Select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </Form.Select>
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" onClick={handleShowModal}>
            Guardar cambios
          </button>
        </div>

        <Modal
          show={showModal}
          message={modalMessage}
          onConfirm={handleConfirmModal}
          onCancel={handleCancelModal}
        />
      </Form.Group>
    </div>
  );
}

export default ProfileEdit;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editPasswordService } from "../services/profile.services";
import Modal from "./Modal";
import Form from "react-bootstrap/Form";

function CambiarPassword({ show, onCancel }) {
  const navigate = useNavigate();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
    seterrorMessage("");
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
    seterrorMessage("");
  };

  const handleShowModalChangePassword = () => {
    setShowModal(true);
    setModalMessage("¿Cambiar contraseña?");
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      seterrorMessage("Las contraseñas no coinciden");
      setShowModal(false);
    } else {
      try {
        const updatedPassword = {
          password: password1,
        };
        await editPasswordService(updatedPassword);
        setShowModal(false);
        navigate("/profile");
      } catch (error) {
        setShowModal(false);
        if (error.response.status === 400) {
          seterrorMessage(error.response.data.errorMessage);
        } else {
          navigate("/error");
        }
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <div>
        <form className="mb-3">
          <Form.Label htmlFor="password1">Nueva contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            onChange={handlePassword1Change}
            value={password1}
          />
          <br />
          <Form.Label htmlFor="password2">
            Repite la nueva contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password2"
            onChange={handlePassword2Change}
            value={password2}
          />
        </form>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <button onClick={handleShowModalChangePassword}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
        <Modal
          show={showModal}
          message={modalMessage}
          onConfirm={handleConfirmModal}
          onCancel={handleCancelModal}
        />
      </div>
    </div>
  );
}

export default CambiarPassword;

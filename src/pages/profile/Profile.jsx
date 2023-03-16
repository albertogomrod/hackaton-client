import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { NavLink } from "react-router-dom";
import HomeAsistencia from "../../components/HomeAsistencia";
import Modal from "../../components/Modal";
import {
  getProfileService,
  deleteProfileService,
} from "../../services/profile.services";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();

  const { authenticateUser, isAdmin, isCompany } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProfileService();
      setProfile(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setModalMessage(
      "¿Seguro que quieres eliminar de forma permanente tu cuenta?"
    );
  };

  const handleConfirmModal = async () => {
    try {
      await deleteProfileService(params._id);
      localStorage.removeItem("authToken");
      authenticateUser();
      navigate("/");
      setShowModal(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{marginTop: "80px"}} >
      <h3>Mi perfil</h3>

      {isFetching === true ? (
        <h3>Cargando...</h3>
      ) : (
        <div>
          <h5>Nombre de usuario: {profile.username}</h5>
          <p>Email: {profile.email}</p>
          <p>Tecnología favorita: {profile.tech}</p>
          <p>Comunidad Autónoma: {profile.comunidadAutonoma}</p>

          <div style={{display: "flex", justifyContent: "center", gap: "20px"}} >
          <Link style={{textDecoration: "none"}} to={`/profile/edit`}>
            <button>Editar perfil</button>
          </Link>
          <button onClick={handleShowModal}>Borrar usuario</button>
          </div>
          <Modal
            show={showModal}
            message={modalMessage}
            onConfirm={handleConfirmModal}
            onCancel={handleCancelModal}
          />
          <br />
          <HomeAsistencia />
          {isCompany === true ? (
            <Link style={{textDecoration: "none"}} to="/profile/hackaton-list-company">
              Hackatones creados por ti
            </Link>
          ) : null}
          {isAdmin === true ? (
            <Link to="/profile/tutorial-list-admin">
              Tutoriales creados por ti
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Profile;

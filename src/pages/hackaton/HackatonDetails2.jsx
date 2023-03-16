import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getHackatonDetailsService,
  updateHackatonArrService,
  deleteHackatonArrService,
  getHackatonByAssistService,
} from "../../services/hackaton.services";
import Modal from "../../components/Modal";
import Tutoriales from "../../components/Tutoriales";
import { SpinnerDotted } from 'spinners-react';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports

function HackatonDetails2() {
  const navigate = useNavigate();
  const params = useParams();
  const { hackatonId } = params;

  const [hackatonDetails, setHackatonDetails] = useState(null);
  const [hackatonsAssist, setHackatonsAssist] = useState(null);
  const [buttonState, setButtonState] = useState("Asistir");

  const [center, setCenter] = useState([40.463667, -3.74922]);

  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getHackatonDetailsService(hackatonId);
      const response2 = await getHackatonByAssistService();
      setHackatonDetails(response.data);
      setHackatonsAssist(response2.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!hackatonDetails || !hackatonsAssist) return;

    const hackatonAssisted = hackatonsAssist.some(
      (eachHackaton) => eachHackaton._id === hackatonId
    );

    if (hackatonAssisted) {
      setButtonState("No asistir");
    } else {
      setButtonState("Asistir");
    }
  }, [hackatonDetails, hackatonsAssist]);

  const handleUpdateData = async () => {
    const existe = hackatonsAssist.some(
      (eachHackaton) => eachHackaton._id === hackatonId
    );

    if (existe) {
      setModalMessage("¿Seguro que quieres dejar de asistir a este hackaton?");
    } else {
      setModalMessage("¿Seguro que quieres asistir a este hackaton?");
    }

    setShowModal(true);
  };

  const handleConfirmModal = async () => {
    const existe = hackatonsAssist.some(
      (eachHackaton) => eachHackaton._id === hackatonId
    );

    if (existe) {
      try {
        await deleteHackatonArrService(hackatonId);
        setButtonState("Asistir");
        const response = await getHackatonByAssistService();
        setHackatonsAssist(response.data);
        setShowModal(false);
      } catch (error) {
        navigate("/error");
      }
    } else {
      try {
        await updateHackatonArrService(hackatonId);
        setButtonState("No asistir");
        const response = await getHackatonByAssistService();
        setHackatonsAssist(response.data);
        setShowModal(false);
      } catch (error) {
        navigate("/error");
      }
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  if (isFetching) {
    return <SpinnerDotted size={50} thickness={179} speed={75} color="rgba(172, 57, 57, 1)" />;
  }

  return (
    <div class="create-hackaton create" key={hackatonDetails._id}  >
      <button style={{marginTop: "30px"}} onClick={() => navigate(-1)}>Atrás</button>
      <h3 style={{marginTop: "20px"}}>{hackatonDetails.title}</h3>
      <br />
      <img src={hackatonDetails.photo} alt="portadaHackaton" width={"60%"} />
      <br />
      <h6>{hackatonDetails.date}</h6>
      <h6>{hackatonDetails.comunidadAutonoma}</h6>
      <p>{hackatonDetails.description}</p>
      <p>Nivel: {hackatonDetails.level}</p>
      <p>Tecnologías: {hackatonDetails.tech}</p>
      <div>
        <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={hackatonDetails.coordinates}>
            <Popup>
              <p>{hackatonDetails.title}</p>
              <p>{hackatonDetails.date}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <br />
      <button style={{marginBottom: "30px"}} onClick={handleUpdateData}>{buttonState}</button>

      

      <Modal
        show={showModal}
        message={modalMessage}
        onConfirm={handleConfirmModal}
        onCancel={handleCancelModal}
      />
      <Tutoriales tech={hackatonDetails.tech} />
      <br />
    </div>
  );
}

export default HackatonDetails2;

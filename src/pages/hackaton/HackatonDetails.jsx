import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getHackatonDetailsService,
  updateHackatonArrService,
  deleteHackatonArrService,
  getHackatonByAssistService,
} from "../../services/hackaton.services";

function HackatonDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { hackatonId } = params;

  const [hackatonDetails, setHackatonDetails] = useState(null);
  const [hackatonsAssist, setHackatonsAssist] = useState(null);
  const [buttonState, setButtonState] = useState("Asistir");

  const [isFetching, setIsFetching] = useState(true);

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

  const updateData = async () => {
    const existe = hackatonsAssist.some(
      (eachHackaton) => eachHackaton._id === hackatonId
    );
    let confirmMessage = "";
  
    if (existe === true) {
      confirmMessage = "¿Seguro que quieres dejar de asistir a este hackaton?";
    } else {
      confirmMessage = "¿Seguro que quieres asistir a este hackaton?";
    }
  
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      if (existe === true) {
        try {
          await deleteHackatonArrService(hackatonId);
          setButtonState("Asistir");
        } catch (error) {
          navigate("/error");
        }
      } else {
        try {
          await updateHackatonArrService(hackatonId);
          setButtonState("No asistir");
        } catch (error) {
          navigate("/error");
        }
      }
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div key={hackatonDetails._id}>
      <h3>{hackatonDetails.title}</h3>
      <button onClick={() => navigate(-1)}>← Back</button>
      <br />
      <img src={hackatonDetails.photo} alt="portadaHackaton" />
      <br />
      <h6>{hackatonDetails.date}</h6>
      <h6>{hackatonDetails.comunidadAutonoma}</h6>
      <p>{hackatonDetails.description}</p>
      <p>Nivel: {hackatonDetails.level}</p>
      <p>Tecnologías: {hackatonDetails.tech}</p>
      {<button onClick={updateData}>{buttonState}</button>}
      <br />
    </div>
  );
}

export default HackatonDetails;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getHackatonDetailsService,
  deleteHackatonService,
  updateHackatonArrService
} from "../../services/hackaton.services";


function HackatonDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const {hackatonId} = params

  const [hackatonDetails, setHackatonDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   updateData();()
  // }, []);

  const updateData = async () => {
    try {
      await updateHackatonArrService(hackatonId)
    } catch (error) {
      navigate("/error");
    }
  }

  const getData = async () => {
    try {
      const response = await getHackatonDetailsService(hackatonId);
      setHackatonDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
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
      <button onClick={updateData}>Asistir</button>
      <br />
    </div>
  );
}

export default HackatonDetails;

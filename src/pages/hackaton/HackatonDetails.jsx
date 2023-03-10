import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getHackatonDetailsService } from "../../services/hackaton.services";

function HackatonDetails() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)

  const [hackatonDetails, setHackatonDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getHackatonDetailsService(params.hackatonId);
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
      <Link to={`/hackaton/details/${hackatonDetails._id}`}>
        {hackatonDetails.title}
      </Link>
      <br />
      <img src={hackatonDetails.photo} alt="portadaHackaton" />
      <br />
      <h6>{hackatonDetails.date}</h6>
      <h6>{hackatonDetails.comunidadAutonoma}</h6>
      <p>{hackatonDetails.description}</p>
      <p>Nivel: {hackatonDetails.level}</p>
      <p>Tecnologías: {hackatonDetails.tech}</p>
      <button>Asistir</button>
    </div>
  );
}

export default HackatonDetails;

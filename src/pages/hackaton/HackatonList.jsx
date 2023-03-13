import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllHackatonsService, getHackatonByCityService } from "../../services/hackaton.services.js";

function HackatonList() {
  const navigate = useNavigate();
  const [allHackatones, setAllHackatones] = useState(null);
  const [hackatonsByCity, setHackatonsByCity] = useState(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true); //Para las segundas llamadas
    try {
      const response1 = await getAllHackatonsService();
      const response2 = await getHackatonByCityService();
      
      setIsFetching(false);
      setAllHackatones(response1.data);
      setHackatonsByCity(response2.data)
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div>
      <h3>Próximos hackatones</h3>
      {hackatonsByCity.length === 0 ? (
        null
      ) : <h2>Cerca de tí: en {hackatonsByCity[0].comunidadAutonoma} </h2>}
      {hackatonsByCity.map((eachHackaton) => {
        return (
          <div key={eachHackaton._id}>
            <h3>{eachHackaton.title}</h3>
            <br />
            <img src={eachHackaton.photo} alt="portadaHackaton" width={400}/>
            <br />
            <h6>{eachHackaton.date}</h6>
            <h6>{eachHackaton.comunidadAutonoma}</h6>
            <p>{eachHackaton.description}</p>
            <p>Nivel: {eachHackaton.level}</p>
            <p>Tecnologías: {eachHackaton.tech}</p>
            <button>
              {" "}
              <Link to={`/hackaton/details/${eachHackaton._id}`}>
                Mas información
              </Link>
            </button>
          </div>
        );
      })}
      {allHackatones.length === 0 ? (
        <h1>Todavía no hay hackatones disponibles</h1>
      ) : <h2>En España</h2>}
      {allHackatones.map((eachHackaton) => {
        return (
          <div key={eachHackaton._id}>
            <h3>{eachHackaton.title}</h3>
            <br />
            <img src={eachHackaton.photo} alt="portadaHackaton" width={400}/>
            <br />
            <h6>{eachHackaton.date}</h6>
            <h6>{eachHackaton.comunidadAutonoma}</h6>
            <p>{eachHackaton.description}</p>
            <p>Nivel: {eachHackaton.level}</p>
            <p>Tecnologías: {eachHackaton.tech}</p>
            <button>
              {" "}
              <Link to={`/hackaton/details/${eachHackaton._id}`}>
                Mas información
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default HackatonList;

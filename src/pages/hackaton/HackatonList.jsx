import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllHackatonsService } from "../../services/hackaton.services.js";

function HackatonList() {
  const navigate = useNavigate();
  const [allHackatones, setAllHackatones] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true); //Para las segundas llamadas
    try {
      const response = await getAllHackatonsService();
      console.log(response.data);
      setIsFetching(false);
      setAllHackatones(response.data);
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

      {allHackatones.length === 0 ? (
        <h1>Todavía no hay hackatones disponibles</h1>
      ) : null}
      {allHackatones.map((eachHackaton) => {
        return (
          <div key={eachHackaton._id}>
            <h3>{eachHackaton.title}</h3>
            <br />
            <img src={eachHackaton.photo} alt="portadaHackaton" />
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

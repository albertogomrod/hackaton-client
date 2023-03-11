import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHackatonsService } from "../services/hackaton.services.js";


function HomeHackatons() {

    const [allHackatones, setAllHackatones] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        setIsFetching(true);
        try {
          const response = await getAllHackatonsService();
          setIsFetching(false);
          setAllHackatones(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      if (isFetching === true) {
        return <h3>Cargando...</h3>;
      }

  return (
    <div>
      <h3>Próximos hackatones</h3>
      {allHackatones.map((eachHackaton) => {
        return (
          <img key={eachHackaton._id} src={eachHackaton.photo} alt="hackaton" />
        )
      })}
      {allHackatones.length === 0 ? (
        <h5>Todavía no hay hackatones disponibles</h5>
      ) : null}
      <Link to="/hackaton-list">Ver todos los hackatones disponibles</Link>
    </div>
  )
}

export default HomeHackatons
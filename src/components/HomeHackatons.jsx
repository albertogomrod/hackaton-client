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
      <div style={{display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center"}} >
      {allHackatones.map((eachHackaton) => {
        return (
          <div key={eachHackaton._id}>
          <Link to={`/hackaton/details/${eachHackaton._id}`}><img src={eachHackaton.photo} alt="hackaton" width={150} /></Link>
          </div>
        )
      })}
      {allHackatones.length === 0 ? (
        <h5>Todavía no hay hackatones disponibles</h5>
      ) : null}
      </div>
      <Link to="/hackaton-list">Ver todos los hackatones disponibles</Link>
    </div>
  )
}

export default HomeHackatons
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHackatonByCityService, getAllHackatonsService } from "../services/hackaton.services.js";

function HomeCercaDeTi() {

    const [hackatonsByCity, setHackatonsByCity] = useState(null)
    const [allHackatones, setAllHackatones] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        setIsFetching(true);
        try {
          const response1 = await getHackatonByCityService();
          const response2 = await getAllHackatonsService()
          setIsFetching(false);
          setHackatonsByCity(response1.data);
          setAllHackatones(response2.data);
        } catch (error) {
          console.log(error);
        }
      };

      if (isFetching === true) {
        return <h3>Cargando...</h3>;
      }
      
      if (allHackatones.length === 0) {
        return null
      } else if (hackatonsByCity.length === 0) {
        return null
      } else {
        return (
          <div>
            <h3>Cerca de tí</h3>
            <div style={{display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center"}}>
            {hackatonsByCity.map((eachHackaton) => {
              return (
                <div key={eachHackaton._id} >
                <Link to={`/hackaton/details/${eachHackaton._id}`} ><img src={eachHackaton.photo} alt="hackaton" width={150} /></Link>
                </div>
              )
            })}
            </div>
          </div>
        )
      }
}

export default HomeCercaDeTi
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getHackatonByCityService,
  getAllHackatonsService,
} from "../services/hackaton.services.js";
import { SpinnerDotted } from "spinners-react";

function HomeCercaDeTi() {
  const [hackatonsByCity, setHackatonsByCity] = useState(null);
  const [allHackatones, setAllHackatones] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response1 = await getHackatonByCityService();
      const response2 = await getAllHackatonsService();
      setIsFetching(false);
      setHackatonsByCity(response1.data);
      setAllHackatones(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return (
      <SpinnerDotted
        size={50}
        thickness={179}
        speed={75}
        color="rgba(172, 57, 57, 1)"
      />
    );
  }

  if (allHackatones.length === 0) {
    return null;
  } else if (hackatonsByCity.length === 0) {
    return null;
  } else {
    return (
      <div className="home-hackatons zoomOut homeHacka">
        <h3 className="titulos">Cerca de tí</h3>
        <p>Estos hackathones se celebrarán en tu Comunidad Autónoma</p>
        <div style={{ overflowX: "auto", scrollBehavior: "smooth" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {hackatonsByCity.map((eachHackaton) => {
              return (
                <div key={eachHackaton._id}>
                  <Link to={`/hackaton/details/${eachHackaton._id}`}>
                    <figure>
                      <img
                        src={eachHackaton.photo}
                        alt="hackaton"
                        width={170}
                      />
                    </figure>
                  </Link>
                </div>
              );
            })}
            {hackatonsByCity.length === 0 ? (
              <h5>Todavía no hay hackatones disponibles</h5>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCercaDeTi;

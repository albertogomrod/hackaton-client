import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHackatonsService } from "../services/hackaton.services.js";
import { SpinnerDotted } from 'spinners-react';

function HomeHackatons() {
  const [allHackatones, setAllHackatones] = useState(null);
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
    return <SpinnerDotted size={50} thickness={179} speed={75} color="rgba(172, 57, 57, 1)" />;
  }

  return (
    <div className="home-hackatons zoomOut homeHacka">
      <h3 className="titulos">Próximos hackathones</h3>
      <p>Encuentra toda la información de los futuros eventos </p>
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
          {allHackatones.map((eachHackaton) => {
            return (
              <div key={eachHackaton._id}>
                <Link to={`/hackaton/details/${eachHackaton._id}`}>
                  <figure>
                    <img src={eachHackaton.photo} alt="hackaton" width={170} />
                  </figure>
                </Link>
              </div>
            );
          })}
          {allHackatones.length === 0 ? (
            <h5>Todavía no hay hackatones disponibles</h5>
          ) : null}
        </div>
      </div>
      <Link className="links" to="/hackaton-list">
        Ver todos los hackatones disponibles
      </Link>
    </div>
  );
}

export default HomeHackatons;

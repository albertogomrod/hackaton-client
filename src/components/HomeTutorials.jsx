import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTutorialsService } from "../services/tutorial.services.js";
import Player from "react-player";
import { SpinnerDotted } from 'spinners-react';

function HomeTutorials() {
  const [allTutoriales, setAllTutoriales] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getAllTutorialsService();
      setIsFetching(false);
      setAllTutoriales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <SpinnerDotted size={50} thickness={179} speed={75} color="rgba(172, 57, 57, 1)" />;
  }

  return (
    <div className="home-hackatons zoomOut homeHacka">
      <h3 className="titulos">Tutoriales</h3>
      <p>¡Saca adelante los hackathones con estos tutoriales!</p>
      <div style={{ overflowX: "auto", scrollBehavior: "smooth" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {allTutoriales.map((eachTutorial) => {
            return (
              <Link to={`/tutorial/details/${eachTutorial._id}`}>
                <figure>
                  <Player
                    url={eachTutorial.videoUrl}
                    width={150}
                    height={85}
                    controls={false}
                    light={true}
                  />
                </figure>
              </Link>
            );
          })}
        </div>
      </div>
      {allTutoriales.length === 0 ? (
        <h5>Todavía no hay tutoriales disponibles</h5>
      ) : (
        <Link className="links" to="/tutorial-list">
          Ver todos los tutoriales
        </Link>
      )}
    </div>
  );
}

export default HomeTutorials;

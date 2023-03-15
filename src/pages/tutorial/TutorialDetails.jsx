import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getTutorialDetailsService,
  deleteTutorialService,
} from "../../services/tutorial.services.js";
import Player from "react-player";

function TutorialDetails() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const [tutorialDetails, setTutorialDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTutorialDetailsService(params.tutorialId);
      // console.log(response.data)
      setTutorialDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div key={tutorialDetails._id}>
      <h3>{tutorialDetails.title}</h3>
      <button onClick={() => navigate(-1)}>Atrás</button>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Player
          url={tutorialDetails.videoUrl}
          width={480}
          height={270}
          controls={true}
        />
      </div>
      <br />
      <p>{tutorialDetails.description}</p>
      <p>Tecnologías: {tutorialDetails.tech}</p>
      <br />
    </div>
  );
}
export default TutorialDetails;

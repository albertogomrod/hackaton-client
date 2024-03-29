import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getTutorialDetailsService,
  deleteTutorialService,
} from "../../services/tutorial.services.js";
import Player from "react-player";
import { SpinnerDotted } from "spinners-react";

function TutorialDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const [tutorialDetails, setTutorialDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTutorialDetailsService(params.tutorialId);
      setTutorialDetails(response.data);
      setIsFetching(false);
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

  return (
    <div key={tutorialDetails._id}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <button onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <h3 style={{ marginTop: "20px" }}>{tutorialDetails.title}</h3>
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

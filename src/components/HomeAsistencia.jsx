import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHackatonByAssistService } from "../services/hackaton.services.js";
import { SpinnerDotted } from "spinners-react";

function HomeAsistencia() {
  const [hackatonsAssist, setHackatonsAssist] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getHackatonByAssistService();
      setIsFetching(false);
      setHackatonsAssist(response.data);
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

  if (hackatonsAssist.length === 0) {
    return null;
  } else {
    return (
      <div>
        <h3>Eventos a los que vas a asistir</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {hackatonsAssist.map((eachHackaton) => {
            return (
              <div key={eachHackaton._id}>
                <Link to={`/hackaton/details/${eachHackaton._id}`}>
                  <img src={eachHackaton.photo} alt="hackaton" width={150} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomeAsistencia;

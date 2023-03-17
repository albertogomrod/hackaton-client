import { useState, useEffect } from "react";
import { getAllTutorialsService } from "../services/tutorial.services.js";
import { Link } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

function Tutoriales(props) {
  const [allTutorials, setAllTutorials] = useState(null);
  const [matchedArr, setMatchedArr] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const techToSearch = props.tech;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllTutorialsService();
      setAllTutorials(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filteredTutoriales =
      allTutorials &&
      allTutorials.filter((eachTutorial) => {
        return eachTutorial.tech === techToSearch;
      });
    setMatchedArr(filteredTutoriales);
  }, [allTutorials, techToSearch]);

  if (isFetching === true) {
    return (
      <SpinnerDotted
        size={50}
        thickness={179}
        speed={75}
        color="rgba(172, 57, 57, 1)"
      />
    );
  } else {
    return (
      <div style={{ marginTop: "30px" }}>
        {matchedArr && matchedArr.length > 0 && (
          <h3>¡Tutoriales para prepararte este hackaton!</h3>
        )}
        {matchedArr ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#8d5252",
                marginTop: "20px",
                padding: "20px",
              }}
            >
              {matchedArr.map((eachTutorial) => {
                return (
                  <div key={eachTutorial.title}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/tutorial/details/${eachTutorial._id}`}
                    >
                      <h3>{eachTutorial.title}</h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Tutoriales;

import { useState, useEffect } from "react";
import { getAllTutorialsService } from "../services/tutorial.services.js";
import { Link } from "react-router-dom";

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

  console.log(matchedArr);

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  } else {
    return (
      <div>
        {matchedArr && matchedArr.length > 0 && (
          <h3>Tutoriales para prepararte para este hackaton!</h3>
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
            {matchedArr.map((eachTutorial) => {
              return (
                <div key={eachTutorial.title}>
                <Link to={`/tutorial/details/${eachTutorial._id}`}>
                  <img
                    src={eachTutorial.image}
                    alt="foto-tutorial"
                    width={150}
                  />
                </Link>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Tutoriales;

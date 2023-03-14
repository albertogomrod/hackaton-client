import { useState, useEffect } from "react";
import { getAllTutorialsService } from "../services/tutorial.services.js";

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
    return <h3>Cargando...</h3>;
  } else {
    return (
      <div>
        <h3>Tutoriales para prepararte para este hackaton!</h3>
        {matchedArr !== null
          ? matchedArr.map((eachTutorial) => {
              return (
                <>
                  <img
                    src={eachTutorial.image}
                    alt="foto-tutorial"
                    width={50}
                  />
                </>
              );
            })
          : null}
      </div>
    );
  }
}

export default Tutoriales;

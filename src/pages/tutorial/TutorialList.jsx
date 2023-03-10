import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllTutorialsService } from "../../services/tutorial.services.js";

function TutorialList() {
  const navigate = useNavigate();
  const [allTutorials, setAllTutorials] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getAllTutorialsService();
      console.log(response.data);
      setIsFetching(false);
      setAllTutorials(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div>
      <h3>Todos los tutoriales</h3>

      {allTutorials.length === 0 ? (
        <h1>Todavía no hay tutoriales disponibles</h1>
      ) : null}
      {allTutorials.map((eachTutorial) => {
        return (
          <div key={eachTutorial._id}>
            <h2>{eachTutorial.title}</h2>
            <br />
            <img src={eachTutorial.image} alt="portada-tutorial" />
            <br />
            <h6>{eachTutorial.description}</h6>
            <p>Tecnologías: {eachTutorial.tech}</p>
            <Link to={`/hackaton/details/${eachTutorial._id}`}>
              Más información
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TutorialList;

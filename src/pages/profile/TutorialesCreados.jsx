import { useEffect, useState } from "react";
import { getTutorialByProfile } from "../../services/profile.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTutorialService } from "../../services/tutorial.services";

function TutorialesCreados() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const [tutorials, setTutorials] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // obtener los elementos del backend
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTutorialByProfile();
      console.log(response.data);
      setIsFetching(false);
      setTutorials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTutorial = async (id) => {
    try {
      await deleteTutorialService(id);
      const response = await getTutorialByProfile();
      setTutorials(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div>
      <h3>Tutoriales creados por ti</h3>
      <button onClick={() => navigate(-1)}>← Back</button>
      {tutorials.map((eachTutorial) => {
        return (
          <div key={eachTutorial._id}>
            <h4>{eachTutorial.title}</h4>
            <img src={eachTutorial.photo} alt="" />
            <p>{eachTutorial.description}</p>
            <button>
              <Link to={`/tutorial/edit/${eachTutorial._id}`}>
                Editar Tutorial
              </Link>
            </button>
            <button
              onClick={() => {
                handleDeleteTutorial(eachTutorial._id);
              }}
            >
              {" "}
              Borrar
            </button>
          </div>
        );
      })}
      {tutorials.length === 0 ? (
        <h5>Todavía no has creado ningún Tutorial</h5>
      ) : null}
      <Link to="/tutorial/create">Crear un Tutorial</Link>
      <br />
      <Link to="/tutorial-list">Ver todos los tutoriales</Link>
    </div>
  );
}

export default TutorialesCreados;

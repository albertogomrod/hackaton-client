import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTutorialsService } from "../services/tutorial.services.js";

function HomeTutorials() {

    const [allTutoriales, setAllTutoriales] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        setIsFetching(true);
        try {
          const response = await getAllTutorialsService()
          setIsFetching(false);
          setAllTutoriales(response.data)
        } catch (error) {
          console.log(error);
        }
      };
    
      if (isFetching === true) {
        return <h3>Cargando...</h3>;
      }

  return (
<div>
      <h3>Tutoriales</h3>
      <div style={{display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center"}}>
      {allTutoriales.map((eachTutorial) => {
        return (
          <img key={eachTutorial._id} src={eachTutorial.image} alt="tutorial" width={150}/>
        )
      })}
      </div>
      {allTutoriales.length === 0 ? (
        <h5>Todavía no hay tutoriales disponibles</h5>
      ) : <Link to="/tutorial-list">Ver todos los tutoriales</Link>}
    </div>
  )
}

export default HomeTutorials
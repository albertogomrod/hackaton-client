import { useEffect, useState } from "react";
import { getHackatonByProfile } from "../../services/profile.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteHackatonService } from "../../services/hackaton.services";

function HackatonesCreados() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)

  const [hackatones, setHackatones] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // obtener los elementos del backend
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getHackatonByProfile();
      console.log(response.data);
      setIsFetching(false);

      setHackatones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHackaton = async (id) => {
    try {
      await deleteHackatonService(id);
      const response = await getHackatonByProfile();
      setHackatones(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div>
      <h3>Hackatones creados por ti</h3>

      {hackatones.map((eachHackaton) => {
        return (
          <div key={eachHackaton._id}>
            <h4>{eachHackaton.title}</h4>
            <img src={eachHackaton.photo} alt="" />
            <p>{eachHackaton.description}</p>
            <button>
              <Link to={`/hackaton/edit/${eachHackaton._id}`}>
                Editar Hackaton
              </Link>
            </button>
            <button onClick={ () => {
              handleDeleteHackaton(eachHackaton._id)
            } }> Borrar</button>
          </div>
        );
      })}
      {hackatones.length === 0 ? (
        <h5>Todavía no has creado ningún Hackaton</h5>
      ) : null}
      <Link to="/hackaton/create">Crear un Hackaton</Link>
      <br />
      <Link to="/hackaton-list">Ver todos los hackatones</Link>
    </div>
  );
}

export default HackatonesCreados;

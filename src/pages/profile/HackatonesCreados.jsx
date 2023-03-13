import { useEffect, useState } from "react";
import { getHackatonByProfile } from "../../services/profile.services";
import { Link } from "react-router-dom";

function HackatonesCreados() {
    const [hackatones, setHackatones] = useState([]);
  
    useEffect(() => {
      // obtener los elementos del backend
      getData()
  
    }, []);

    const getData = async () => {
        
        try {
          const response = await getHackatonByProfile();
          console.log(response.data);
        
          setHackatones(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
  
    return (
        <div>
        <h3>Hackatones creados por ti</h3>
        
        {hackatones.map((eachHackaton) => {
          return (
            <div key={eachHackaton._id}>
            <h4>{eachHackaton.title}</h4>
            <img src={eachHackaton.photo} alt="" />
            <p>{eachHackaton.description}</p>
            <button>Editar Hackaton</button>
            <button>Borrar</button>
            </div>
          )
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
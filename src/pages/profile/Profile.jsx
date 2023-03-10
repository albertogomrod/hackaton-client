import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import {
  getProfileService,
  deleteProfileService,
} from "../../services/profile.services";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();

  const { authenticateUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProfileService();
      setProfile(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfileService(params._id);
      localStorage.removeItem("authToken");
      authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Mi perfil</h3>

      {isFetching === true ? (
        <h3>Cargando...</h3>
      ) : (
        <div>
          <h4>Nombre de usuario: {profile.username}</h4>
          <p>Email: {profile.email}</p>
          <p>Tecnologías: {profile.tech}</p>
          <p>Comunidad Autónoma: {profile.comunidadAutonoma}</p>

          <Link to={`/profile/edit`}>
            <button>Editar perfil</button>
          </Link>
          <button onClick={handleDeleteProfile}>Borrar usuario</button>
        </div>
      )}
    </div>
  );
}

export default Profile;

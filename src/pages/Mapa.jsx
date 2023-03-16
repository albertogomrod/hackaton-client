import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getAllHackatonsService } from "../services/hackaton.services";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Mapa() {
  const navigate = useNavigate();

  const [center, setCenter] = useState([40.463667, -3.74922]);
  const [hackatonDetails, setHackatonDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getAllHackatonsService();
      console.log(response.data);
      console.log(response.data.coordinates);
      setHackatonDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div style={{marginTop: "80px"}} class="mapa">
    <h3>Mapa</h3>
    <h6>Encuentra en este mapa los mejores hackatones que se celebrarán proximamente</h6>
      <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* invoke Marker Componentes here */}
        {hackatonDetails.map((eachElement) => {
          return (
            <Marker position={eachElement.coordinates}>
              <Popup>
                {/* Example of the rest of the document data*/}
                <p>{eachElement.title}</p>
                <p>{eachElement.date}</p>
                <Link to={`/hackaton/details/${eachElement._id}`}>Mas información</Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      <Link to="/hackaton-list">Acerca sobre estos hackatones</Link>
    </div>
  );
}

export default Mapa;

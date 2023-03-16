import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getAllHackatonsService } from "../services/hackaton.services";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

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
    <div class="mapa">
    <h2 className="bold">Mapa</h2>
    <h6>Explora en este mapa los lugares en los que se celebrarán Hackathones proximamente.</h6>
    <br />
    <p>Haz click sobre ellos para saber más detalles.</p>
      <MapContainer id="mapaTamaño" center={center} zoom={5} scrollWheelZoom={false}>
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
      <br />
      <Link className= "links" to="/hackaton-list">Todos los Hackathones</Link>
    </div>
  );
}

export default Mapa;

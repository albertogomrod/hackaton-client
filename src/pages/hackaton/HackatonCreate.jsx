import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createHackatonService } from "../../services/hackaton.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import nivel from "../../utils/nivel";
import { uploadImageHackatonService } from "../../services/upload.services";
import Form from "react-bootstrap/Form";

import { MapContainer, TileLayer, Marker } from "react-leaflet"; // for Leaflet Component imports
import ClickMarker from "../../components/ClickMarker";

function HackatonCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [level, setLevel] = useState("");
  const [tech, setTech] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [center, setCenter] = useState([40.463667, -3.74922]); // state used to define the center of the map on first render. [51.505, -0.09] is just an example.
  const [clickedPosition, setClickedPosition] = useState(null);

  useEffect(() => {
    if (isCreated === false && countDown === 0) return;
    if (isCreated === true && countDown === 0) navigate("/");

    const instervalId = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(instervalId);
  }, [countDown]);

  const handleStartCountdown = () => {
    setCountDown(5);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleComunidadAutonomaChange = (e) =>
    setComunidadAutonoma(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);
  const handleMapChange = (e) => setCoordinates(e.target.value);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageHackatonService(uploadData);
      setImageUrl(response.data.imageUrl);
      console.log(imageUrl);

      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newHackaton = {
        title,
        date,
        photo: imageUrl,
        description,
        comunidadAutonoma,
        level,
        tech,
        coordinates: clickedPosition,
      };
      await createHackatonService(newHackaton);
      setIsCreated(true);
      setErrorMessage("");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response.status === 409) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div
      class="create-hackaton"
      style={{
        marginBottom: "100px",
        backgroundColor: "#ffc3a1",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <button style={{ marginTop: "20px" }} onClick={() => navigate(-1)}>
        Atrás
      </button>
      <h3>Crear un Hackaton</h3>
      <Form.Group className="mb-3" onSubmit={handleSubmit}>
        <Form.Label htmlFor="title">Título: </Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <Form.Label htmlFor="description">Descripción: </Form.Label>
        <Form.Control
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />
        <Form.Label htmlFor="date">Fecha del evento: </Form.Label>
        <Form.Control
          type="date"
          name="date"
          onChange={handleDateChange}
          value={date}
        />
        <br />
        <Form.Label>Image: </Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {/* below disabled prevents the user from attempting another upload while one is already happening */}
        {/* to render a loading message or spinner while uploading the picture */}
        {isUploading ? <h3>... uploading image</h3> : null}
        {/* below line will render a preview of the image from cloudinary */}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <Form.Label htmlFor="comunidadAutonoma">
          Comunidad Autónoma:{" "}
        </Form.Label>
        <Form.Select
          name="comunidadAutonoma"
          value={comunidadAutonoma}
          onChange={handleComunidadAutonomaChange}
        >
          <option value="">-- Seleccione una comunidad --</option>
          {comunidadesAutonomas.map((eachComunidadAutonoma) => (
            <option value={eachComunidadAutonoma} key={eachComunidadAutonoma}>
              {eachComunidadAutonoma}
            </option>
          ))}
        </Form.Select>
        <br />
        <Form.Label htmlFor="level">Nivel: </Form.Label>
        <Form.Select name="level" value={level} onChange={handleLevelChange}>
          <option value="">- Seleccione un nivel de experiencia -</option>
          {nivel.map((eachNivel) => (
            <option value={eachNivel} key={eachNivel}>
              {eachNivel}
            </option>
          ))}
        </Form.Select>
        <br />
        <Form.Label htmlFor="tech">Tecnologías </Form.Label>
        <Form.Select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </Form.Select>
        <br />

        <Form.Label htmlFor="clickedPosition">Coordenadas: </Form.Label>
        <Form.Control
          type="text"
          name="clickedPositions"
          onChange={handleMapChange}
          value={clickedPosition}
        />
        <br />

        <p>
          <em>¡Pincha en el mapa para obtenertener las coordenadas exactas!</em>
        </p>

        <div class="mapa-create">
          <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* invoke Marker Componentes here */}
            <ClickMarker setClickedPosition={setClickedPosition} />
            {clickedPosition !== null && <Marker position={clickedPosition} />}
          </MapContainer>
        </div>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          onClick={handleStartCountdown}
        >
          Crear nuevo Hackaton
        </button>
        </div>
      </Form.Group>
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      {isCreated === true ? (
        <div>
          <p>Hackaton creado correctamente</p>
          <p>Será redirigido a la página principal en... {countDown}</p>
        </div>
      ) : null}
    </div>
  );
}

export default HackatonCreate;

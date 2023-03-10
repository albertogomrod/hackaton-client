import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createHackatonService } from "../../services/hackaton.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import nivel from "../../utils/nivel";
import { uploadImageHackatonService } from "../../services/upload.services";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports
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
  const [isCreated, setIsCreated] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [ center, setCenter ] = useState([51.505, -0.09]) // state used to define the center of the map on first render. [51.505, -0.09] is just an example.
  const [clickedPosition, setClickedPosition] = useState(null);


  

  useEffect(() => {
    if (isCreated === false && countDown === 0) return;
    if (isCreated === true && countDown === 0) navigate("/");
    
    const instervalId = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1)
    }, 1000)
    
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
      };
      await createHackatonService(newHackaton);
      setIsCreated(true)
      setErrorMessage("")
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
    <div>
      <h3>Crear un Hackaton</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">T??tulo: </label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <label htmlFor="description">Descripci??n: </label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />

        <label htmlFor="date">Fecha del evento: </label>
        <input
          type="date"
          name="date"
          onChange={handleDateChange}
          value={date}
        />
        <br />

        <label>Image: </label>
        <input
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

        <label htmlFor="comunidadAutonoma">Comunidad Aut??noma: </label>
        <select
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
        </select>
        <br />

        <label htmlFor="level">Nivel: </label>
        <select name="level" value={level} onChange={handleLevelChange}>
          <option value="">- Seleccione un nivel de experiencia -</option>
          {nivel.map((eachNivel) => (
            <option value={eachNivel} key={eachNivel}>
              {eachNivel}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="tech">Tecnolog??as </label>
        <select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnolog??a --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </select>
        <br />
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* invoke Marker Componentes here */}
  <ClickMarker setClickedPosition={setClickedPosition} />
  { clickedPosition !== null && <Marker position={clickedPosition} /> }

</MapContainer>;

        <button type="submit" onClick={handleStartCountdown}>Crear nuevo Hackaton</button>
      </form>
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      {isCreated === true ? (
        <div>
          <p>Hackaton creado correctamente</p>
          <p>Ser?? redirigido a la p??gina principal en... {countDown}</p>
        </div>
      ) : null}
    </div>
  );
}

export default HackatonCreate;

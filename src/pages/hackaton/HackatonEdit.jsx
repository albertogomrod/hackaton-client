import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getHackatonDetailsService,
  editHackatonService,
} from "../../services/hackaton.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";

function HackatonEdit() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [level, setLevel] = useState("");
  const [tech, setTech] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handlePhotoChange = (event) => setPhoto(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleComunidadAutonomaChange = (event) =>
    setComunidadAutonoma(event.target.value);
  const handleLevelChange = (event) => setLevel(event.target.value);
  const handleTechChange = (event) => setTech(event.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getHackatonDetailsService(params.hackatonId);
      const {
        title,
        date,
        photo,
        description,
        comunidadAutonoma,
        level,
        tech,
      } = response.data;
      setComunidadAutonoma(comunidadAutonoma);
      setDate(date);
      setDescription(description);
      setLevel(level);
      setPhoto(photo);
      setTech(tech);
      setTitle(title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedHackaton = {
        title: title,
        date: date,
        photo: photo,
        description: description,
        comunidadAutonoma: comunidadAutonoma,
        level: level,
        tech: tech,
      };

      await editHackatonService(params.hackatonId, updatedHackaton);

      navigate(`/hackaton/details/${params.hackatonId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Editar Hackaton</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título: </label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <label htmlFor="description">Descripción: </label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />

        <label htmlFor="date">Fecha: </label>
        <input
          type="text"
          name="date"
          onChange={handleDateChange}
          value={date}
        />
        <br />

        <label htmlFor="photo">Foto de portada: </label>
        <input
          type="text"
          name="photo"
          onChange={handlePhotoChange}
          value={photo}
        />
        <br />

        <label htmlFor="comunidadAutonoma">Comunidad Autónoma: </label>
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
        <input
          type="text"
          name="level"
          onChange={handleLevelChange}
          value={level}
        />
        <br />

        <label htmlFor="tech">Tecnologías </label>
        <select
          name="tech"
          value={tech}
          onChange={handleTechChange}
        >
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </select>
        <br />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default HackatonEdit;

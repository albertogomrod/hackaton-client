import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHackatonService } from "../../services/hackaton.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import nivel from "../../utils/nivel";

function HackatonCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [level, setLevel] = useState("");
  const [tech, setTech] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleComunidadAutonomaChange = (e) =>
    setComunidadAutonoma(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newHackaton = {
        title: title,
        date: date,
        photo: photo,
        description: description,
        comunidadAutonoma: comunidadAutonoma,
        level: level,
        tech: tech,
      };

      await createHackatonService(newHackaton);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Crear un Hackaton</h3>

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

        <label htmlFor="date">Fecha del evento: </label>
        <input
          type="date"
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
        <select
          name="level"
          value={level}
          onChange={handleLevelChange}
        >
          <option value="">- Seleccione un nivel de experiencia -</option>
          {nivel.map((eachNivel) => (
            <option value={eachNivel} key={eachNivel}>
              {eachNivel}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="tech">Tecnologías </label>
        <select name="tech" value={tech} onChange={handleTechChange}>
          <option value="">-- Seleccione una tecnología --</option>
          {tecnologias.map((eachTecnologia) => (
            <option value={eachTecnologia} key={eachTecnologia}>
              {eachTecnologia}
            </option>
          ))}
        </select>
        <br />

        <button type="submit">Crear nuevo Hackaton</button>
      </form>
    </div>
  );
}

export default HackatonCreate;

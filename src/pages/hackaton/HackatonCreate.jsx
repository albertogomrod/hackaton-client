import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHackatonService } from "../../services/hackaton.services";

function HackatonCreate() {

  const navigate= useNavigate()

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
  const handleComunidadAutonomaChange = (event) => setComunidadAutonoma(event.target.value);
  const handleLevelChange = (event) => setLevel(event.target.value);
  const handleTechChange = (event) => setTech(event.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const newHackaton = {
        title: title,
        date: date,
        photo: photo,
        description: description,
        comunidadAutonoma: comunidadAutonoma,
        level:level,
        tech:tech,
      }

      await createHackatonService(newHackaton)


    } catch (error) {
      navigate("/error")
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
        <input
          type="text"
          name="comunidadAutonoma"
          onChange={handleComunidadAutonomaChange}
          value={comunidadAutonoma}
        />
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
        <input
          type="text"
          name="tech"
          onChange={handleTechChange}
          value={tech}
        />
        <br />

        <button type="submit">Crear nuevo Hackaton</button>
      </form>
    </div>
  )
}

export default HackatonCreate
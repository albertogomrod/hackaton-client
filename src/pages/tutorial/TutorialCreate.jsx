import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTutorialService } from "../../services/tutorial.services";
import tecnologias from "../../utils/tecnologias";

function TutorialCreate() {

  const navigate= useNavigate()
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [tech, setTech] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLinksChange = (e) => setLinks(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTutorial = {
        title: title,
        image: image,
        description: description,
        links:links,
        tech:tech,
      }
      await createTutorialService(newTutorial)
    } catch (error) {
      navigate("/error")
    }
  };
  return (
    <div>
      <h3>Editar Tutorial</h3>
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
        <label htmlFor="image">Foto de portada: </label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />
        <br />
        <label htmlFor="links">Nivel: </label>
        <input
          type="text"
          name="links"
          onChange={handleLinksChange}
          value={links}
        />
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
        <br />
        <button type="submit">Crear nuevo Tutorial</button>
      </form>
    </div>
  )
}
export default TutorialCreate
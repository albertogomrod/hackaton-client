import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTutorialDetailsService, editTutorialService } from "../../services/tutorial.services";

function TutorialEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [tech, setTech] = useState("");
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleLinksChange = (event) => setLinks(event.target.value);
  const handleTechChange = (event) => setTech(event.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTutorialDetailsService(params.tutorialId);
      const {
        title,
        image,
        description,
        links,
        tech,
      } = response.data;
      setDescription(description);
      setLinks(links);
      setImage(image);
      setTech(tech);
      setTitle(title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedTutorial = {
        title: title,
        image: image,
        description: description,
        links:links,
        tech:tech,
      }
      await editTutorialService(params.tutorialId, updatedTutorial)
      navigate(`/tutorial/details/${params.tutorialId}`)
    } catch (error) {
      console.log(error)
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
        <label htmlFor="links">Links: </label>
        <input
          type="text"
          name="links"
          onChange={handleLinksChange}
          value={links}
        />
        <br />
        <label htmlFor="tech">Tecnologías: </label>
        <input
          type="text"
          name="tech"
          onChange={handleTechChange}
          value={tech}
        />
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
export default TutorialEdit;
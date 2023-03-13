import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTutorialService } from "../../services/tutorial.services";
import tecnologias from "../../utils/tecnologias";
import { uploadImageTutorialService } from "../../services/upload.services";

function TutorialCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [tech, setTech] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [isUploading, setIsUploading] = useState(false);

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
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLinksChange = (e) => setLinks(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageTutorialService(uploadData);
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
      const newTutorial = {
        title: title,
        image: imageUrl,
        description: description,
        links: links,
        tech: tech,
      };
      await createTutorialService(newTutorial);
      setIsCreated(true)
      setErrorMessage("")
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <h3>Crear Tutorial</h3>
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
        <label htmlFor="links">Links: </label>
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
        <button type="submit" onClick={handleStartCountdown}>Crear nuevo Tutorial</button>
      </form>
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      {isCreated === true ? (
        <div>
          <p>Tutorial creado correctamente</p>
          <p>Será redirigido a la página principal en... {countDown}</p>
        </div>
      ) : null}
    </div>
  );
}
export default TutorialCreate;

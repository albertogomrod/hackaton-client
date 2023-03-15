import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTutorialService } from "../../services/tutorial.services";
import tecnologias from "../../utils/tecnologias";
import Player from 'react-player';

function TutorialCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState('');
  const [tech, setTech] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleLinksChange = (e) => setVideoUrl(e.target.value);
  const handleTechChange = (e) => setTech(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTutorial = {
        title,
        description,
        videoUrl,
        tech,
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
      <button onClick={() => navigate(-1)}>← Back</button>
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
  
        <label htmlFor="links">URL: </label>
        <input
          type="text"
          name="links"
          onChange={handleLinksChange}
          value={videoUrl}
        />
        {videoUrl && (
        <div style={{display: "flex", justifyContent: "center"}}>
        <Player
          url={videoUrl}
          width={480}
          height={270}
          controls={true}
        />
        </div> 
      )}
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

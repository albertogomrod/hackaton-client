import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTutorialService } from "../../services/tutorial.services";
import tecnologias from "../../utils/tecnologias";
import Player from "react-player";
import Form from "react-bootstrap/Form";

function TutorialCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tech, setTech] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
      setIsCreated(true);
      setErrorMessage("");
    } catch (error) {
      if (error.response.status === 400) {
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
        marginBottom: "200px",
        backgroundColor: "#ffc3a1",
        marginTop: "30px",
      }}
    >
      <button onClick={() => navigate(-1)}>Atrás</button>
      <h3 style={{ marginTop: "30px" }}>Crear Tutorial</h3>
      <form className="mb-3" onSubmit={handleSubmit}>
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

        <Form.Label htmlFor="links">URL: </Form.Label>
        <Form.Control
          type="text"
          name="links"
          onChange={handleLinksChange}
          value={videoUrl}
        />
        {videoUrl && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Player url={videoUrl} width={480} height={270} controls={true} />
          </div>
        )}
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
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" onClick={handleStartCountdown}>
            Crear nuevo Tutorial
          </button>
        </div>
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

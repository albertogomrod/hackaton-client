import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getHackatonDetailsService,
  editHackatonService,
} from "../../services/hackaton.services";
import tecnologias from "../../utils/tecnologias";
import comunidadesAutonomas from "../../utils/comunidades";
import Form from "react-bootstrap/Form";

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
    <div
      class="create-hackaton"
      style={{
        marginTop: "30px",
        marginBottom: "100px",
        backgroundColor: "#ffc3a1",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <button style={{ marginTop: "30px" }} onClick={() => navigate(-1)}>
        Atrás
      </button>
      <h3 style={{ marginTop: "20px" }}>Editar Hackaton</h3>
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

        <Form.Label htmlFor="date">Fecha: </Form.Label>
        <Form.Control
          type="text"
          name="date"
          onChange={handleDateChange}
          value={date}
        />
        <br />

        <Form.Label htmlFor="photo">Foto de portada: </Form.Label>
        <Form.Control
          type="text"
          name="photo"
          onChange={handlePhotoChange}
          value={photo}
        />
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
        <Form.Control
          type="text"
          name="level"
          onChange={handleLevelChange}
          value={level}
        />
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

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default HackatonEdit;

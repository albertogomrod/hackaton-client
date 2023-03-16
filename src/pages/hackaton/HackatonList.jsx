import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getAllHackatonsService,
  getHackatonByCityService,
} from "../../services/hackaton.services.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";

function HackatonList() {
  const navigate = useNavigate();
  const [allHackatones, setAllHackatones] = useState(null);
  const [hackatonsByCity, setHackatonsByCity] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true); //Para las segundas llamadas
    try {
      const response1 = await getAllHackatonsService();
      const response2 = await getHackatonByCityService();

      setIsFetching(false);
      setAllHackatones(response1.data);
      setHackatonsByCity(response2.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div
      style={{
        paddingBottom: "150px",
        backgroundColor: "#ffc3a1"
      }}
    >
      <h3 className="bold">Próximos hackatones</h3>
      {hackatonsByCity.length === 0 ? null : (
        <div>
        <h4>Cerca de tí: en {hackatonsByCity[0].comunidadAutonoma} </h4>
        <h6>¡Encuentra los Hackathones que se celebran muy pronto en tu Comunidad Autónoma!</h6>
        </div>
        
      )}
      
      {hackatonsByCity.map((eachHackaton) => {
        return (
          <Container key={eachHackaton._id} style={{marginTop: "25px", marginBottom: "25px"}}>
            <Row>
              <Col>
                <Card>
                  <Card.Img
                    variant="top"
                    src={eachHackaton.photo}
                    alt="portadaHackaton"
                    width={400}
                  />
                  <Card.Body className= "cardBody">
                    <Card.Title className= "cardText">{eachHackaton.title}</Card.Title>
                    <Card.Text className= "cardText">
                      <h6>{eachHackaton.date}</h6>
                      <h6>{eachHackaton.comunidadAutonoma}</h6>
                      <p>{eachHackaton.description}</p>
                      <p>Nivel: {eachHackaton.level}</p>
                      <p>Tecnologías: {eachHackaton.tech}</p>
                    </Card.Text>
                    <button className="buttonHackaton masInfo">
                      <Link to={`/hackaton/details/${eachHackaton._id}`} style={{textDecoration: "none", color: "#fff"}}>
                        Mas información
                      </Link>
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      })}
      {allHackatones.length === 0 ? (
        <h1>Todavía no hay hackatones disponibles.</h1>
      ) : (
        <div>
        <h3 className="bold">En España</h3>
        <h4>En esta lista aparecen todos los Hackathones organizados en este país.</h4>
        <h6>Puedes conocer todos los detalles de estos en el boton de "Más información".</h6>
        </div>
        
      )}
      {allHackatones.map((eachHackaton) => {
        return (
          <Container key={eachHackaton._id} style={{marginTop: "25px", marginBottom: "25px"}} >
            <Row>
              <Col>
                <Card>
                  <Card.Img
                    variant="top"
                    src={eachHackaton.photo}
                    alt="portadaHackaton"
                    width={400}
                  />
                  <Card.Body className= "cardBody">
                    <Card.Title className= "cardText">{eachHackaton.title}</Card.Title>
                    <Card.Text className= "cardText">
                      <h6>{eachHackaton.date}</h6>
                      <h6>{eachHackaton.comunidadAutonoma}</h6>
                      <p>{eachHackaton.description}</p>
                      <p>Nivel: {eachHackaton.level}</p>
                      <p>Tecnologías: {eachHackaton.tech}</p>
                    </Card.Text>
                    <button className="buttonHackaton masInfo" >
                      <Link to={`/hackaton/details/${eachHackaton._id}`} style={{textDecoration: "none", color: "#fff"}} >
                        Mas información
                      </Link>
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
}

export default HackatonList;

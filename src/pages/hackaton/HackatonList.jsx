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
      <h3>Próximos hackatones</h3>
      {hackatonsByCity.length === 0 ? null : (
        <h2>Cerca de tí: en {hackatonsByCity[0].comunidadAutonoma} </h2>
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
                  <Card.Body>
                    <Card.Title>{eachHackaton.title}</Card.Title>
                    <Card.Text>
                      <h6>{eachHackaton.date}</h6>
                      <h6>{eachHackaton.comunidadAutonoma}</h6>
                      <p>{eachHackaton.description}</p>
                      <p>Nivel: {eachHackaton.level}</p>
                      <p>Tecnologías: {eachHackaton.tech}</p>
                    </Card.Text>
                    <button className="buttonHackaton">
                      <Link to={`/hackaton/details/${eachHackaton._id}`} style={{textDecoration: "none", color: "#8d5252"}}>
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
        <h1>Todavía no hay hackatones disponibles</h1>
      ) : (
        <h2>En España</h2>
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
                  <Card.Body>
                    <Card.Title>{eachHackaton.title}</Card.Title>
                    <Card.Text>
                      <h6>{eachHackaton.date}</h6>
                      <h6>{eachHackaton.comunidadAutonoma}</h6>
                      <p>{eachHackaton.description}</p>
                      <p>Nivel: {eachHackaton.level}</p>
                      <p>Tecnologías: {eachHackaton.tech}</p>
                    </Card.Text>
                    <button className="buttonHackaton" >
                      <Link to={`/hackaton/details/${eachHackaton._id}`} style={{textDecoration: "none", color: "#8d5252"}} >
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

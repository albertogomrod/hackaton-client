import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllTutorialsService } from "../../services/tutorial.services.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

function TutorialList() {
  const navigate = useNavigate();
  const [allTutorials, setAllTutorials] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getAllTutorialsService();
      console.log(response.data);
      setIsFetching(false);
      setAllTutorials(response.data);
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
        backgroundColor: "#ffc3a1",
      }}
    >
      <h3 style={{marginTop: "20px"}} >Tutoriales disponibles</h3>

      {allTutorials.length === 0 ? (
        <h1>Todavía no hay tutoriales disponibles</h1>
      ) : null}
      {allTutorials.map((eachTutorial) => {
        return (
          <Container
            key={eachTutorial._id}
            style={{ marginTop: "25px", marginBottom: "25px" }}
          >
            <Row>
              <Col>
                <Card>
                  <Card.Body className= "cardBody">
                    <Card.Title style={{fontSize: "2rem"}} className= "cardText">{eachTutorial.title}</Card.Title>
                    <Card.Text className= "cardText">
                      <p>{eachTutorial.description}</p>
                      <p>Tecnologías: {eachTutorial.tech}</p>
                    </Card.Text>
                    <button className="buttonHackaton masInfo">
                      <Link
                        to={`/tutorial/details/${eachTutorial._id}`}
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        Ver tutorial
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

export default TutorialList;

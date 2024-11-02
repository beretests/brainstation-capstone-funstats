import "./StatStack.scss";
import {
  Stack,
  Image,
  Card,
  Badge,
  Spinner,
  Row,
  Col,
  CardGroup,
} from "react-bootstrap";
import transformImage from "../../utils/transformImage";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
function StatStack({ friendStats }) {
  if (!friendStats)
    return (
      <>
        <div>
          <Spinner animation="border" role="status" />
        </div>
      </>
    );

  const identity = ["name", "id", "profile_pic"];
  const offenses = ["yellow_cards", "red_cards", "offsides", "fouls"];

  const maxValues = {};

  for (let key in friendStats[0]) {
    maxValues[key] = Math.max(friendStats[0][key], friendStats[1][key]);
  }

  return (
    <>
      <h2 className="stats-heading">Stats Challenge</h2>
      <div className="stats-container">
        <div className="d-md-none mobile-stack">
          <Row>
            {friendStats.map((player) => (
              <Col xs={6} key={player.id} className="text-center mb-3">
                <Image
                  src={player.profile_pic}
                  alt={player.name}
                  thumbnail
                  width={100}
                  height={100}
                />
                <h5>{player.name}</h5>
              </Col>
            ))}
          </Row>
          {Object.keys(maxValues)
            .filter((item) => !identity.includes(item))
            .map((stat) => (
              <Row
                key={stat}
                className="align-items-center py-2 px-3 text-center mb-2"
              >
                <Col xs={12} className="fw-bold">
                  {stat.replace(/_/g, " ").toUpperCase()}
                </Col>
                {friendStats.map((player) => (
                  <Col xs={6} key={player.id} className="stat-column">
                    {player[stat]}
                    {parseInt(player[stat]) === maxValues[stat] &&
                      offenses.includes(stat) && (
                        <Badge bg="danger" className="badge">
                          ⚠️
                        </Badge>
                      )}
                    {parseInt(player[stat]) === maxValues[stat] &&
                      !offenses.includes(stat) && (
                        <Badge bg="success" className="badge">
                          🏆
                        </Badge>
                      )}
                  </Col>
                ))}
              </Row>
            ))}
        </div>

        <div className="stack">
          <CardGroup>
            <Card>
              <Card.Title className="spacer"></Card.Title>
              <Card.Body>
                {Object.keys(maxValues)
                  .filter((item) => !identity.includes(item))
                  .map((stat) => (
                    <Row
                      key={stat}
                      className="align-items-center text-right mb-2"
                    >
                      <Col className="fw-bold">
                        {stat.replace(/_/g, " ").toUpperCase()}
                      </Col>
                    </Row>
                  ))}
              </Card.Body>
            </Card>
            {friendStats.map((player) => (
              <Card key={player.id}>
                <AdvancedImage
                  className="friends__image"
                  cldImg={transformImage(player.profile_pic, 200)}
                  plugins={[
                    lazyload(),
                    placeholder({ mode: "predominant-color" }),
                  ]}
                />
                <Card.Title>{player.name}</Card.Title>
                <Card.Body>
                  {Object.keys(maxValues)
                    .filter((item) => !identity.includes(item))
                    .map((stat) => (
                      <Row
                        key={stat}
                        className="align-items-center text-center mb-2"
                      >
                        <Col key={player.id} className="stat-column">
                          {player[stat]}{" "}
                          {parseInt(player[stat]) === maxValues[stat] &&
                            offenses.includes(stat) && (
                              <Badge bg="danger" className="badge">
                                ⚠️
                              </Badge>
                            )}
                          {parseInt(player[stat]) === maxValues[stat] &&
                            !offenses.includes(stat) && (
                              <Badge bg="success" className="badge">
                                🏆
                              </Badge>
                            )}
                        </Col>
                      </Row>
                    ))}
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </div>
      </div>
    </>
  );
}

export default StatStack;

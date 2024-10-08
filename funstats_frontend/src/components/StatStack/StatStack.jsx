import "./StatStack.scss";
import { Stack, Image, Card, Badge, Spinner, Row, Col } from "react-bootstrap";

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

      <div className="d-md-none">
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
            <Row key={stat} className="align-items-center text-center mb-2">
              <Col xs={12} className="fw-bold">
                {stat.replace(/_/g, " ").toUpperCase()}
              </Col>
              {friendStats.map((player) => (
                <Col xs={6} key={player.id}>
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
              ))}
            </Row>
          ))}
      </div>

      <div className="stack">
        {friendStats.map((player) => (
          <Stack
            key={player.id}
            // direction="horizontal"
            gap={6}
            className="mb-4 flex-wrap d-none d-md-flex align-items-center"
          >
            <Image
              src={player.profile_pic}
              alt={player.name}
              thumbnail
              width={100}
              height={100}
            />
            <Card>
              <Card.Body>
                {/* <Card.Img src={player.profile_pic} /> */}
                <Card.Title>{player.name}</Card.Title>
                <Card.Text>
                  {Object.keys(maxValues)
                    .filter((item) => !identity.includes(item))
                    .map((stat) => (
                      <Row
                        key={stat}
                        className="align-items-center text-center mb-2"
                      >
                        <Col xs={6} className="fw-bold">
                          {stat.replace(/_/g, " ").toUpperCase()}
                        </Col>
                        <Col xs={6} key={player.id}>
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
                </Card.Text>
              </Card.Body>
            </Card>
          </Stack>
        ))}
      </div>
    </>
  );
}

export default StatStack;

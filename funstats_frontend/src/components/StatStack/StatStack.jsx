import "./StatStack.scss";
import {
  Stack,
  Image,
  Card,
  Table,
  Badge,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

function StatStack({ friendStats }) {
  if (!friendStats)
    return (
      <>
        <div>
          <Spinner animation="border" role="status" />
        </div>
      </>
    );

  const maxValues = friendStats.reduce(
    (max, player) => {
      return {
        goals_scored: Math.max(max.goals_scored, parseInt(player.goals_scored)),
        assists: Math.max(max.assists, parseInt(player.assists)),
        shots_on_target: Math.max(
          max.shots_on_target,
          parseInt(player.shots_on_target)
        ),
        tackles: Math.max(max.tackles, parseInt(player.tackles)),
        interceptions: Math.max(
          max.interceptions,
          parseInt(player.interceptions)
        ),
        saves: Math.max(max.saves, parseInt(player.saves)),
        yellow_cards: Math.max(max.yellow_cards, parseInt(player.yellow_cards)),
        red_cards: Math.max(max.red_cards, parseInt(player.red_cards)),
        fouls: Math.max(max.fouls, parseInt(player.fouls)),
        headers_won: Math.max(max.headers_won, parseInt(player.headers_won)),
        offsides: Math.max(max.offsides, parseInt(player.offsides)),
      };
    },
    {
      goals_scored: 0,
      assists: 0,
      shots_on_target: 0,
      tackles: 0,
      interceptions: 0,
      saves: 0,
      yellow_cards: 0,
      red_cards: 0,
      fouls: 0,
      headers_won: 0,
      offsides: 0,
    }
  );

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
        {Object.keys(maxValues).map((stat) => (
          <Row key={stat} className="align-items-center text-center mb-2">
            <Col xs={12} className="fw-bold">
              {stat.replace(/_/g, " ").toUpperCase()}
            </Col>
            {friendStats.map((player) => (
              <Col xs={6} key={player.id}>
                {player[stat]}{" "}
                {parseInt(player[stat]) === maxValues[stat] &&
                  (stat !== "YELLOW CARDS" ||
                    stat !== "RED CARDS" ||
                    stat !== "OFFSIDES" ||
                    stat !== "FOULS") && <Badge bg="success">🏆</Badge>}
              </Col>
            ))}
          </Row>
        ))}
      </div>

      <div className="stack">
        {friendStats.map((player) => (
          <Stack
            key={player.id}
            direction="horizontal"
            gap={3}
            className="mb-4 flex-wrap d-none d-md-flex"
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
                <Card.Title>{player.name}</Card.Title>
                <Table hover striped>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Goals Scored</strong>
                      </td>
                      <td>
                        {player.goals_scored}{" "}
                        {parseInt(player.goals_scored) ===
                          maxValues.goals_scored && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Assists</strong>
                      </td>
                      <td>
                        {player.assists}{" "}
                        {parseInt(player.assists) === maxValues.assists && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shots on Target</strong>
                      </td>
                      <td>
                        {player.shots_on_target}{" "}
                        {parseInt(player.shots_on_target) ===
                          maxValues.shots_on_target && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tackles</strong>
                      </td>
                      <td>
                        {player.tackles}{" "}
                        {parseInt(player.tackles) === maxValues.tackles && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Interceptions</strong>
                      </td>
                      <td>
                        {player.interceptions}{" "}
                        {parseInt(player.interceptions) ===
                          maxValues.interceptions && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Saves</strong>
                      </td>
                      <td>
                        {player.saves}{" "}
                        {parseInt(player.saves) === maxValues.saves && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Yellow Cards</strong>
                      </td>
                      <td>
                        {player.yellow_cards}{" "}
                        {parseInt(player.yellow_cards) ===
                          maxValues.yellow_cards && (
                          <Badge bg="danger">⚠️</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Red Cards</strong>
                      </td>
                      <td>
                        {player.red_cards}{" "}
                        {parseInt(player.red_cards) === maxValues.red_cards && (
                          <Badge bg="danger">⚠️</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fouls</strong>
                      </td>
                      <td>
                        {player.fouls}{" "}
                        {parseInt(player.fouls) === maxValues.fouls && (
                          <Badge bg="danger">⚠️</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Headers Won</strong>
                      </td>
                      <td>
                        {player.headers_won}{" "}
                        {parseInt(player.headers_won) ===
                          maxValues.headers_won && (
                          <Badge bg="success">🏆</Badge>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Offsides</strong>
                      </td>
                      <td>
                        {player.offsides}{" "}
                        {parseInt(player.offsides) === maxValues.offsides && (
                          <Badge bg="danger">⚠️</Badge>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Stack>
        ))}
      </div>
    </>
  );
}

export default StatStack;

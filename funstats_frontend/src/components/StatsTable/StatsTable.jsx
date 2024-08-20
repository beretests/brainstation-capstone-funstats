import "./StatsTable.scss";
import { Stack, Image, Card, Table } from "react-bootstrap";

function StatsTable({ stats }) {
  const rows = [];
  rows.push(stats);

  return (
    <>
      <div className="playerStats">
        <h2 className="playerStats__heading">My Stats</h2>

        {rows.map((player) => (
          <Stack key={stats.id} direction="horizontal" gap={3} className="mb-4">
            <Image
              src={player.profile_pic}
              alt={player.name}
              thumbnail
              width={100}
              height={100}
            />
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>{player.name}</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Goals Scored</strong>
                      </td>
                      <td>{player.goals_scored}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Assists</strong>
                      </td>
                      <td>{player.assists}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shots on Target</strong>
                      </td>
                      <td>{player.shots_on_target}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tackles</strong>
                      </td>
                      <td>{player.tackles}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Interceptions</strong>
                      </td>
                      <td>{player.interceptions}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Saves</strong>
                      </td>
                      <td>{player.saves}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Yellow Cards</strong>
                      </td>
                      <td>{player.yellow_cards}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Red Cards</strong>
                      </td>
                      <td>{player.red_cards}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fouls</strong>
                      </td>
                      <td>{player.fouls}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Headers Won</strong>
                      </td>
                      <td>{player.headers_won}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Offsides</strong>
                      </td>
                      <td>{player.offsides}</td>
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

export default StatsTable;

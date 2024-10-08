import "./PersonalStats.scss";
import { Stack, Image, Card, Table } from "react-bootstrap";

function PersonalStats({ stats, season }) {
  const rows = [];
  rows.push(stats);
  const personalInfoKeys = ["name", "id", "profile_pic"];

  return (
    <>
      <div className="playerStats">
        <h2 className="playerStats__heading">
          My Stats for{" "}
          {season
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          season
        </h2>

        {rows.map((player) => (
          <Stack
            key="stat-stack"
            direction="horizontal"
            gap={3}
            className="mb-4"
          >
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
                    {Object.entries(player)
                      .filter(([key]) => !personalInfoKeys.includes(key))
                      .map(([key, value]) => (
                        <tr key={key}>
                          <td>
                            <strong>
                              {key.replace(/_/g, " ").toUpperCase()}
                            </strong>
                          </td>
                          <td>{value}</td>
                        </tr>
                      ))}
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

export default PersonalStats;

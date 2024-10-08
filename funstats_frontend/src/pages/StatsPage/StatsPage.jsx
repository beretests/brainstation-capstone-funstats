import "./StatsPage.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAggregateStats } from "../../utils/getAggregateStats";
import PersonalStats from "../../components/PersonalStats/PersonalStats";
import StatStack from "../../components/StatStack/StatStack";
import axios from "axios";
import { Stack, Button, Alert } from "react-bootstrap";

function StatsPage() {
  const { id, friendId, season } = useParams();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [friendStats, setFriendStats] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const location = useLocation();
  const message = location.state?.message;
  const [showAlert, setShowAlert] = useState(!!message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    getAggregateStats(id, setPlayerAggregateStats, season);
  }, [!friendId]);

  const handleClick = () => {
    navigate(`/player/${id}/stats/${season}/add`);
  };

  const handleCompareStats = async (id, friendId) => {
    try {
      setFriendStats([]);
      const response = await axios.get(
        `${url}/player/${id}/stats/${season}/compare/${friendId}`
      );
      setFriendStats([...friendStats, ...response.data]);
    } catch (err) {
      alert("Error: ", err);
    }
  };

  useEffect(() => {
    handleCompareStats(id, friendId);
  }, [friendId]);

  return (
    <>
      {friendId ? (
        <StatStack id={id} friendId={friendId} friendStats={friendStats} />
      ) : (
        <div className="stats">
          {showAlert && message && (
            <Alert
              variant="success"
              className="mt-3"
              dismissible
              onClose={() => setShowAlert(false)}
            >
              {message}
            </Alert>
          )}
          <PersonalStats
            stats={playerAggregateStats}
            season={season}
            className="stats-stack"
          />
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button className="profile__button" onClick={handleClick}>
              Add New Game Stat
            </Button>
          </Stack>
        </div>
      )}
    </>
  );
}

export default StatsPage;

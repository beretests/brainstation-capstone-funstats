import "./StatsPage.scss";
import AddStatsForm from "../../components/AddStatsForm/AddStatsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getAggregateStats } from "../../utils/getAggregateStats";
import StatsTable from "../../components/StatsTable/StatsTable";
import StatStack from "../../components/StatStack/StatStack";
import axios from "axios";
import { Stack, Button, Alert } from "react-bootstrap";

function StatsPage() {
  const { id, friendId } = useParams();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [friendStats, setFriendStats] = useState([]);
  const [statAdded, setStatAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef(null);
  const elementRef = useRef(null);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAggregateStats(id, setPlayerAggregateStats);
  }, [!friendId]);

  useEffect(() => {
    if (statAdded) {
      getAggregateStats(id, setPlayerAggregateStats);
      setTimeout(() => {
        if (alertRef.current) {
          alertRef.current.focus();
        }
      }, 100);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [statAdded]);

  const handleClick = () => {
    setIsVisible(true);
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behaviour: "smooth" });
      }
    }, 100);
  };

  const handleCompareStats = async (id, friendId) => {
    try {
      setFriendStats([]);
      const response = await axios.get(
        `${url}/player/${id}/stats/compare/${friendId}`
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
          {showAlert && (
            <Alert ref={alertRef} showAlert={showAlert} variant="success">
              Successfully added new stats for a game. Way to go! 🏆
            </Alert>
          )}
          <StatsTable stats={playerAggregateStats} className="stats-stack" />
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button className="profile__button" onClick={handleClick}>
              Add New Game Stat
            </Button>
          </Stack>

          {isVisible && (
            <AddStatsForm
              ref={elementRef}
              setIsVisible={setIsVisible}
              setStatAdded={setStatAdded}
              setShowAlert={setShowAlert}
            />
          )}
        </div>
      )}
    </>
  );
}

export default StatsPage;

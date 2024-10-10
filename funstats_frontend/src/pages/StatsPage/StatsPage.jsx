import "./StatsPage.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAggregateStats } from "../../utils/getAggregateStats";
import PersonalStats from "../../components/PersonalStats/PersonalStats";
import StatStack from "../../components/StatStack/StatStack";
import axios from "axios";
import { Stack, Button, Alert, Modal, Form, Spinner } from "react-bootstrap";

function StatsPage() {
  const { id, season, friendId } = useParams();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [friendStats, setFriendStats] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const seasonUrl = `${url}/stats/seasons`;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const message = location.state?.message;
  const [showAlert, setShowAlert] = useState(!!message);

  const [seasonList, setSeasonList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(season);

  const getSeasonList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(seasonUrl);
      setSeasonList(response.data);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !selectedSeason ||
      selectedSeason === "null" ||
      selectedSeason === "undefined"
    ) {
      getSeasonList();
    } else {
      setSelectedSeason(season);
    }
  }, [selectedSeason, season]);

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
  }, [!friendId, selectedSeason]);

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
  }, [friendId, selectedSeason]);

  if (loading)
    return (
      <>
        <div>
          <Spinner animation="border" role="status" />
        </div>
      </>
    );

  const handleSeasonSelect = (e) => {
    const newSeason = e.target.value;
    setSelectedSeason(newSeason);
    setShowModal(false);

    const newStatPath = friendId
      ? `/player/${id}/stats/${newSeason}/compare/${friendId}`
      : `/player/${id}/stats/${newSeason}`;

    navigate(newStatPath, { replace: true });
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Game Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form.Select onChange={handleSeasonSelect}>
              <option>Open this select menu</option>
              <option value="">Choose season...</option>
              {seasonList.map((season, index) => (
                <option key={index} value={season.season}>
                  {season.season}
                </option>
              ))}
              <option value="add-new">Add new season...</option>
            </Form.Select>
          )}
        </Modal.Body>
      </Modal>
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

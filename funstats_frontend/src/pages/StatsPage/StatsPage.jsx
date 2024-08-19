import "./StatsPage.scss";
import AddStatsForm from "../../components/AddStatsForm/AddStatsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAggregateStats } from "../../utils/getAggregateStats";
import StatsTable from "../../components/StatsTable/StatsTable";
import StatStack from "../../components/StatStack/StatStack";
import axios from "axios";

function StatsPage() {
  const { id, friendId } = useParams();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [friendStats, setFriendStats] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAggregateStats(id, setPlayerAggregateStats);
  }, [!friendId]);

  const handleClick = () => {
    setIsVisible(true);
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
          <StatsTable stats={playerAggregateStats} className="stats-stack" />
          <button className="profile__button" onClick={handleClick}>
            Add Stat
          </button>
          <button className="profile__button">Compare Stat</button>
          {isVisible && (
            <AddStatsForm
              setPlayerAggregateStats={setPlayerAggregateStats}
              setIsVisible={setIsVisible}
            />
          )}
        </div>
      )}
    </>
  );
}

export default StatsPage;

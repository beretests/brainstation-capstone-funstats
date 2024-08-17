import "./StatsPage.scss";
import AddStatsForm from "../../components/AddStatsForm/AddStatsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAggregateStats } from "../../utils/getAggregateStats";
import StatsTable from "../../components/StatsTable/StatsTable";

function StatsPage() {
  const { id } = useParams();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getAggregateStats(id, setPlayerAggregateStats);
  }, []);

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="stats">
        <StatsTable stats={playerAggregateStats} />
        <button className="profile__button" onClick={handleClick}>
          Add Stat
        </button>
        <button className="profile__button">Compare Stat</button>
      </div>
      {isVisible && (
        <AddStatsForm
          setPlayerAggregateStats={setPlayerAggregateStats}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  );
}

export default StatsPage;

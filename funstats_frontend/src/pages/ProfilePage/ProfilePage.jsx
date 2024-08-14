import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import StatsTable from "../../components/StatsTable/StatsTable";
import "./ProfilePage.scss";
import axios from "axios";
import { getAge } from "../../utils/getAge";

function ProfilePage() {
  const url = import.meta.env.VITE_API_URL;

  // const { id } = useParams();
  const location = useLocation();
  const [playerAggregateStats, setPlayerAggregateStats] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const data = location.state?.data;

  const getAggregateStats = async (id) => {
    // try {
    const response = await axios.get(`${url}/player/${id}/stats`);
    // console.log("STATS: ", response);
    setPlayerAggregateStats(response.data);
    // } catch (err) {
    //   alert("Error: ", err);
    // }
  };

  const handleClick = async () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      getAggregateStats(data.id);
    }
  }, [isVisible]);

  return (
    <>
      {/* {console.log(playerAggregateStats)} */}
      <div className="profile">
        <div className="profile__image-container">
          <img
            src={data.profile_pic}
            alt={data.name}
            className="profile__image"
          />
        </div>
        <div className="profile__details">
          <p className="profile__name">{data.name}</p>
          <p className="profile__age">{getAge(data.DOB)}</p>
          <p className="profile__position">{data.position}</p>
        </div>
        <button className="profile__button" onClick={() => handleClick()}>
          {isVisible ? "Hide Stats" : "Show Stats"}
        </button>
      </div>
      <div className="stats">
        {isVisible && <StatsTable stats={playerAggregateStats} />}
      </div>
    </>
  );
}

export default ProfilePage;

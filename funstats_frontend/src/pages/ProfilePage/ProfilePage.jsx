import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFriends } from "../../utils/getAggregateStats";
import "./ProfilePage.scss";
import { getAge } from "../../utils/getAge";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import FriendsList from "../../components/FriendsList/FriendsList";

function ProfilePage() {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const profileUrl = `${url}/profile`;
  const friendUrl = `${url}/player/${id}/friends`;
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const token = sessionStorage.getItem("JWTtoken");
  const getProfile = async () => {
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    getProfile();
  }, [token]);

  // useEffect(() => {
  //   getFriends(id, setFriends);
  //   console.log("Friends: ", friends);
  // }, [isVisible]);

  const handleViewStats = (id) => {
    navigate(`/player/${id}/stats`);
  };

  const handleViewFriends = async () => {
    if (!isVisible) {
      try {
        const response = await axios.get(friendUrl);
        // console.log("STATS: ", response);
        setFriends([...friends, ...response.data]);
        console.log("Friends: ", friends[0]);

        setIsVisible(true);
      } catch (err) {
        alert("Error: ", err);
      }
    } else {
      setFriends([]);
    }

    // console.log("Friends: ", response.data);
  };

  const toggleShow = async () => {
    setIsVisible(!isVisible);
    handleViewFriends();
  };

  if (!profileData)
    return (
      <>
        <div>
          <Spinner animation="border" role="status" />
        </div>
      </>
    );

  return (
    <>
      <div className="profile">
        <div>
          <div className="profile__image-container">
            <img
              src={profileData.profile_pic}
              alt={profileData.name}
              className="profile__image"
            />
          </div>
          <div className="profile__details">
            <p className="profile__name">{profileData.name}</p>
            <p className="profile__age">{getAge(profileData.DOB)}</p>
            <p className="profile__position">{profileData.position}</p>
            <div className="profile__button-layout">
              <button
                className="profile__button"
                onClick={() => handleViewStats(id)}
              >
                View Stats
              </button>
              <button className="profile__button" onClick={() => toggleShow()}>
                View Friends
              </button>
            </div>
          </div>
        </div>
        <div className="friendlist">
          {isVisible && <FriendsList friends={friends} getAge={getAge} />}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

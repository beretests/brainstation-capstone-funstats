import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { getAge } from "../../utils/getAge";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import FriendsList from "../../components/FriendsList/FriendsList";
import { Stack, Card, Button } from "react-bootstrap";

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
  //   handleViewFriends();
  // }, [friends]);

  const handleCompareStats = async (id, friendId) => {
    navigate(`/player/${id}/stats/compare/${friendId}`);
  };

  const handleViewFriends = async () => {
    if (!isVisible) {
      try {
        const response = await axios.get(friendUrl);
        setFriends([...friends, ...response.data]);
        // console.log("Friends: ", friends[0]);

        setIsVisible(true);
      } catch (err) {
        alert("Error: ", err);
      }
    } else {
      setFriends([]);
    }
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
      <h2 className="profile__heading">{`${profileData.name}'s Profile`}</h2>

      <div className="profile">
        <Card>
          <Card.Img
            variant="top"
            src={profileData.profile_pic}
            alt={profileData.name}
          />
          <Card.Body>
            <Card.Title>{profileData.name}</Card.Title>
            <Card.Text>
              <strong>Age:</strong> {getAge(profileData.DOB)}
              <br />
              <strong>Position:</strong> {profileData.position}
              <br />
            </Card.Text>
            <Stack gap={2} className="col-md-5 mx-auto">
              <Button href={`/player/${id}/stats`} variant="primary">
                View Stats
              </Button>
              <Button variant="primary" onClick={() => toggleShow()}>
                View Friends
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </div>
      <div className="friendlist">
        {isVisible && (
          <FriendsList
            friends={friends}
            getAge={getAge}
            handleCompareStats={handleCompareStats}
            id={id}
          />
        )}
      </div>
    </>
  );
}

export default ProfilePage;

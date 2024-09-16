import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { getAge } from "../../utils/getAge";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import FriendsList from "../../components/FriendsList/FriendsList";
import { Stack, Card, Button, Alert } from "react-bootstrap";

function ProfilePage() {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const profileUrl = `${url}/profile`;
  const friendUrl = `${url}/player/${id}/friends`;
  const [friends, setFriends] = useState([]);
  const [friendAdded, setFriendAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef(null);

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const token = sessionStorage.getItem("JWTtoken");
  const getProfile = async () => {
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '1'
        },
      });
      console.log(response)
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

  useEffect(() => {
    if (friendAdded) {
      setIsVisible(false);
      handleViewFriends();
      setTimeout(() => {
        if (alertRef.current) {
          alertRef.current.focus();
        }
      }, 100);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [friendAdded]);

  const handleCompareStats = async (id, friendId) => {
    navigate(`/player/${id}/stats/compare/${friendId}`);
  };

  const handleViewFriends = async () => {
    if (!isVisible) {
      try {
        const response = await axios.get(friendUrl);
        setFriends([...friends, ...response.data]);

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
      {showAlert && (
        <Alert ref={alertRef} showAlert={showAlert} variant="success">
          You successfully added a new friend! 🤝
        </Alert>
      )}
      <div className="profile__container">
        <div className="profile">
          <Card className="profile__card">
            <Card.Img
              variant="top"
              src={profileData.profile_pic}
              alt={profileData.name}
              className="profile__card-image"
            />
            <Card.Body className="profile__card-body">
              <Card.Title>{profileData.name}</Card.Title>
              <Card.Text>
                <strong>Age:</strong> {getAge(profileData.DOB)}
                <br />
                <strong>Position:</strong> {profileData.position}
                <br />
              </Card.Text>
              <Stack gap={2} className="col-md-5 mx-auto profile__stack">
                <Button
                  href={`/player/${id}/stats`}
                  variant="primary"
                  className="profile__button profile__button-modified"
                >
                  View Stats
                </Button>
                <Button
                  variant="primary"
                  onClick={() => toggleShow()}
                  className="profile__button"
                >
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
              setFriendAdded={setFriendAdded}
              setShowAlert={setShowAlert}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

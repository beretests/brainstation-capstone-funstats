import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ProfilePage.scss";
import { getAge } from "../../utils/getAge";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Stack, Card, Button, Alert } from "react-bootstrap";
import SelectSeasonModal from "../../components/SelectSeasonModal/SelectSeasonModal";

function ProfilePage() {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const profileUrl = `${url}/profile`;
  const seasonUrl = `${url}/stats/seasons`;
  const [seasons, setSeasons] = useState([]);
  const getSeasonsList = async () => {
    try {
      const response = await axios.get(seasonUrl);
      setSeasons(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const location = useLocation();
  const message = location.state?.message;
  const [showAlert, setShowAlert] = useState(!!message);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    getSeasonsList();
    console.log("Seasons: ", seasons);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleViewFriends = async () => {
    navigate(`/player/${id}/friends`);
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
                  // href={`/player/${id}/stats`}
                  onClick={() => handleShow()}
                  variant="primary"
                  className="profile__button profile__button-modified"
                >
                  View Stats
                </Button>
                <SelectSeasonModal
                  show={show}
                  seasons={seasons}
                  handleClose={handleClose}
                />
                <Button
                  variant="primary"
                  onClick={() => handleViewFriends()}
                  className="profile__button"
                >
                  View Friends
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

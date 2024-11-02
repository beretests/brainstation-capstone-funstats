import { useState } from "react";
import "./FriendsList.scss";
import {
  Stack,
  Card,
  Form,
  Button,
  FloatingLabel,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { getAge } from "../../utils/getAge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";
import transformImage from "../../utils/transformImage";
import {
  AdvancedImage,
  lazyload,
  responsive,
  placeholder,
} from "@cloudinary/react";

function FriendsList({ friends, setFriendAdded, setShowAlert }) {
  const { playerId, season } = useAuth();
  const url = import.meta.env.VITE_API_URL;
  const friendUrl = `${url}/player/${playerId}/friends`;
  const [friendUsername, setFriendUsername] = useState("");
  const navigate = useNavigate();

  const handleCompareStats = async (id, friendId, season) => {
    navigate(`/player/${id}/stats/${season}/compare/${friendId}`);
  };

  const handleUsernameChange = (e) => {
    setFriendUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
      await axios.post(friendUrl, { username: friendUsername });
      setFriendAdded(true);
      setShowAlert(true);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="friends-container">
        <h2 className="friends__heading">Friends</h2>
        <Stack gap={2} className="col-md-5 mx-auto friends__stack">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="friendUserName"
              label="Add new friend (username)"
              className="mb-3"
            >
              <Form.Control
                className="me-auto"
                placeholder="Add friend's username here"
                onChange={handleUsernameChange}
              />
            </FloatingLabel>
            <Button variant="secondary" type="submit">
              Add Friend
            </Button>
          </Form>
        </Stack>
        <div className="friends">
          <Row
            xs={1}
            md={2}
            className="g-4 px-2 px-sm-3 px-md-4 px-md-5 px-lg-5 px-lg-10"
          >
            {friends.map((friend) => (
              <Col key={friend.id}>
                <Card className="friends__card">
                  <AdvancedImage
                    className="friends__image"
                    cldImg={transformImage(friend.profile_pic, 400)}
                    plugins={[
                      lazyload(),
                      placeholder({ mode: "predominant-color" }),
                      responsive({ steps: 200 }),
                    ]}
                  />
                  <Card.Body className="friends__description">
                    <Card.Title>{friend.name}</Card.Title>
                    <Card.Text>
                      <strong>Age:</strong> {getAge(friend.DOB)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Position:</strong> {friend.position}
                    </Card.Text>
                    <Button
                      className="friends__button"
                      onClick={() =>
                        handleCompareStats(playerId, friend.id, season)
                      }
                    >
                      Compare Stats
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default FriendsList;

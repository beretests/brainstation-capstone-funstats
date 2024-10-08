import { useState } from "react";
import "./FriendsList.scss";
import {
  Stack,
  Image,
  Card,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import { getAge } from "../../utils/getAge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";

function FriendsList({
  friends,
  // friendStats,
  // setFriendStats,
  setFriendAdded,
  setShowAlert,
}) {
  // const {friendId} = req.
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
          {friends.map((friend) => (
            <Stack
              key={friend.id}
              direction="horizontal"
              gap={3}
              className="mb-4"
            >
              <Image
                src={friend.profile_pic}
                alt={friend.name}
                thumbnail
                width={100}
                height={100}
              />
              <Card>
                <Card.Body>
                  <Card.Title>{friend.name}</Card.Title>
                  <Card.Text>
                    <strong>Age:</strong> {getAge(friend.DOB)}
                    <br />
                    <strong>Position:</strong> {friend.position}
                    <br />
                  </Card.Text>
                  <Button
                    className="friends__button"
                    onClick={() =>
                      handleCompareStats(
                        playerId,
                        friend.id,
                        season
                        // friendStats,
                        // setFriendStats
                      )
                    }
                  >
                    Compare Stats
                  </Button>
                </Card.Body>
              </Card>
            </Stack>
          ))}
        </div>
      </div>
    </>
  );
}

export default FriendsList;

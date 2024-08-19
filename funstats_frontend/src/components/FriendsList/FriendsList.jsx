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

function FriendsList({
  friends,
  getAge,
  handleCompareStats,
  id,
  friendStats,
  setFriendStats,
}) {
  const url = import.meta.env.VITE_API_URL;
  const friendUrl = `${url}/player/${id}/friends`;
  const [friendUsername, setFriendUsername] = useState("");

  const handleUsernameChange = (e) => {
    setFriendUsername(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // console.log("Form Data: ", JSON.stringify(formData));
      console.log("F: ", friendUsername);

      const friend = await axios.post(
        friendUrl,
        JSON.stringify(friendUsername)
      );
      console.log("F: ", friend);
      // e.currentTarget.reset();
      // navigate("/");
      // setIsSignedUp(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="friends-container">
        <h2 className="friends__heading">Friends</h2>
        <Stack gap={2} className="col-md-5 mx-auto friends__stack">
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
          <Button variant="secondary" onClick={handleSubmit}>
            Add Friend
          </Button>
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
                        id,
                        friend.id,
                        friendStats,
                        setFriendStats
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

import "./FriendsPage.scss";
// import { getAge } from "../../utils/getAge";
import FriendsList from "../../components/FriendsList/FriendsList";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

function FriendsPage() {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const friendUrl = `${url}/player/${id}/friends`;
  const token = sessionStorage.getItem("JWTtoken");
  const [friends, setFriends] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [friendAdded, setFriendAdded] = useState(false);

  const getFriends = async () => {
    try {
      const response = await axios.get(friendUrl);
      setFriends(response.data);
    } catch (err) {
      alert("Error: ", err);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    getFriends();
  }, [token]);

  useEffect(() => {
    if (friendAdded) {
      getFriends();
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [friendAdded]);

  return (
    <>
      <div className="friendlist">
        {showAlert && (
          <Alert variant="success">
            You successfully added a new friend! 🤝
          </Alert>
        )}
        <FriendsList
          friends={friends}
          id={id}
          setFriendAdded={setFriendAdded}
          setShowAlert={setShowAlert}
        />
      </div>
    </>
  );
}
export default FriendsPage;

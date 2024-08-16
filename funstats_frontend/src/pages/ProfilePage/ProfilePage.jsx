import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { getAge } from "../../utils/getAge";

function ProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/player/${id}/stats`);
  };

  return (
    <>
      {/* {console.log(playerAggregateStats)} */}
      <div className="profile">
        <div>
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
            <div className="profile__button-layout">
              <button
                className="profile__button"
                onClick={() => handleClick(id)}
              >
                View Stats
              </button>
              <button className="profile__button">View Friends</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

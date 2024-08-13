import React from "react";
import { useParams, useLocation } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      {console.log("Data from API: ", data)}
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
          <p className="profile__age">{data.DOB}</p>
          <p className="profile__position">{data.position}</p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

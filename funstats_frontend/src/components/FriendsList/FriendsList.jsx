import "./FriendsList.scss";

function FriendsList({ friends, getAge }) {
  return (
    <>
      {friends.map((friend) => (
        <div key={friend.id}>
          <div className="friends__image-container">
            <img
              src={friend.profile_pic}
              alt={friend.name}
              className="friends__image"
            />
          </div>
          <div className="friends__details">
            <p className="friends__name">{friend.name}</p>
            <p className="friends__age">{getAge(friend.DOB)}</p>
            <p className="friends__position">{friend.position}</p>
            <div className="friends__button-layout">
              <button
                className="friends__button"
                onClick={() => handleViewStats(id)}
              >
                View Stats
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FriendsList;

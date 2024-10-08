import axios from "axios";

export const getAggregateStats = async (
  id,
  setPlayerAggregateStats,
  season
) => {
  const url = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${url}/player/${id}/stats/${season}`);
    // console.log("STATS: ", response.data);
    setPlayerAggregateStats(response.data);
  } catch (err) {
    alert("Error: ", err);
  }
};

export const getFriends = async (id, setFriends, setIsVisible) => {
  const url = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${url}/player/${id}/friends`);
    // console.log("STATS: ", response);
    setFriends([...friends, response.data]);
    setIsVisible(true);
  } catch (err) {
    alert("Error: ", err);
  }
};

export const getComparedStats = async (
  id,
  friendId,
  friendStats,
  setFriendStats
) => {
  const url = import.meta.env.VITE_API_URL;

  try {
    setFriendStats([]);
    const response = await axios.get(
      `${url}/player/${id}/stats/compare/${friendId}`
    );
    // console.log("STATS: ", response);
    setFriendStats([...friendStats, response.data]);
  } catch (err) {
    alert("Error: ", err);
  }
};

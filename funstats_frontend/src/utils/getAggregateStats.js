import axios from "axios";

export const getAggregateStats = async (id, setPlayerAggregateStats) => {
  const url = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${url}/player/${id}/stats`);
    // console.log("STATS: ", response);
    setPlayerAggregateStats(response.data);
  } catch (err) {
    alert("Error: ", err);
  }
};

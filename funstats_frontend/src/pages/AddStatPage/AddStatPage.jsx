import "./AddStatPage.scss";
import AddStatsForm from "../../components/AddStatsForm/AddStatsForm";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/authProvider";

function AddStatPage() {
  const { id } = useParams();
  const { season } = useAuth();
  const url = import.meta.env.VITE_API_URL;
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    player_id: id,
    season: season,
    date: today,
    game: "",
    selectedOptions: [],
    optionValues: {},
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const epochDate = Math.floor(new Date(formData.date).getTime() / 1000);
    const finalFormData = {
      ...formData,
      date: epochDate,
      ...formData.optionValues,
    };
    delete finalFormData.optionValues;
    delete finalFormData.selectedOptions;

    try {
      console.log("Form: ", finalFormData);
      await axios.post(`${url}/player/${id}/stats/add`, finalFormData);
      navigate(`/player/${id}/stats/${season}`, {
        state: {
          message: `You've added new stats for the ${finalFormData.game} game. You rock!`,
        },
      });
    } catch (err) {
      console.log("Error adding stat: ", err);
      alert("Error adding stat!");
    }
  };

  return (
    <div>
      <AddStatsForm
        formData={formData}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
      />
    </div>
  );
}

export default AddStatPage;

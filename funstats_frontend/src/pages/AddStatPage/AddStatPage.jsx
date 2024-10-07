import "./AddStatPage.scss";
import AddStatsForm from "../../components/AddStatsForm/AddStatsForm";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAggregateStats } from "../../utils/getAggregateStats";
import axios from "axios";

function AddStatPage() {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [statAdded, setStatAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    player_id: id,
    date: today,
    game: "",
    selectedOptions: [],
    optionValues: {},
  });

  //   useEffect(() => {
  //     if (statAdded) {
  //       getAggregateStats(id, setPlayerAggregateStats);
  //       setTimeout(() => {
  //         if (alertRef.current) {
  //           alertRef.current.focus();
  //         }
  //       }, 100);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 5000);
  //     }
  //   }, [statAdded]);

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
      await axios.post(`${url}/player/${id}/stats/add`, finalFormData);
      //   setStatAdded(true);
      //   setIsVisible(false);
      //   setShowAlert(true);
      navigate(`/player/${id}/stats`, {
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
      {showAlert && (
        <Alert showAlert={showAlert} variant="success">
          Successfully added new stats for a game. Way to go! 🏆
        </Alert>
      )}

      <AddStatsForm
        // ref={elementRef}
        // setIsVisible={setIsVisible}
        // setStatAdded={setStatAdded}
        // setShowAlert={setShowAlert}
        formData={formData}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
      />
    </div>
  );
}

export default AddStatPage;

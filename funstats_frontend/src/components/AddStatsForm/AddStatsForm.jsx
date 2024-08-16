// import DatePicker from "react-datepicker";
import "./AddStatsForm.scss";
import { useState, useEffect } from "react";
import Select from "react-select";
import { options } from "../../data/data";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert/Alert";
import { getAggregateStats } from "../../utils/getAggregateStats";

function AddStatsForm({ setPlayerAggregateStats }) {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const errorMessages = {
    date: "",
    game: "",
  };
  const [errors, setErrors] = useState(errorMessages);

  useEffect(() => {
    if (submitted) {
      getAggregateStats(id, setPlayerAggregateStats);
    }
  }, [submitted]);

  const convertDateToEpoch = (obj) => {
    if (obj.date && isNaN(obj.date)) {
      const date = new Date(obj.date);
      obj.date = Math.floor(date.getTime() / 1000);
    } else {
      console.error("The object does not contain a valid date property.");
    }
    return obj;
  };

  const [formData, setFormData] = useState({
    player_id: id,
    date: today,
    game: "",
  });

  const validateDate = (date) => {
    if (!date || new Date(date) > new Date(today)) {
      return "The date is required and cannot be in the future.";
    }
    return "";
  };

  const validateGame = (game) => {
    if (!game) {
      return "Please enter the game played.";
    }
    return "";
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  // const clearSelection = () => {
  //   setSelectedOptions([]);
  // };

  const handleKeyDown = (event) => {
    if (["e", "-", "+"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    const errorMessage = validateDate(value);
    setFormData({
      ...formData,
      date: value,
    });
    setErrors({ ...errors, date: errorMessage });
  };

  const handleGameChange = (event) => {
    const { value } = event.target;
    const errorMessage = validateGame(value);
    setFormData({ ...formData, game: value });
    setErrors({ ...errors, game: errorMessage });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dateError = validateDate(formData.date);
    const gameError = validateGame(formData.game);

    if (dateError || gameError) {
      setErrors({
        date: dateError,
        game: gameError,
      });
      console.log("Form contains errors.");
    } else {
      console.log(convertDateToEpoch(formData));

      try {
        await axios.post(`${url}/player/${id}/stats/add`, formData);
        // const response = await axios.get(`${url}/videos/${id}`);
        // setCurrentVideo(response.data);
        // setSelectedOptions(null);
        // navigate(`/player/${id}/stats`);
        setSubmitted(true);
        alert("Successfully added stat");
        // <Alert
        //   message="This is a success alert!"
        //   type="success"
        //   duration={5000}
        // />;
        // clearSelection();

        event.target.reset();
        // setFormData({
        //   player_id: id,
        //   date: today,
        //   game: "",
        // });
        // isVisible = false;
      } catch (err) {
        console.log("Error adding stat: ", err);
        alert("Error adding stat!");
      }
      console.log("Form submitted successfully with data:", formData);
    }

    // event.target.reset();
  };

  return (
    <>
      <section className="stats">
        <h2 className="stats__title">Stats</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-group">
            <label htmlFor="date" className="form__label">
              Date
            </label>
            <div className="input">
              <input
                type="date"
                id="date"
                value={formData.date}
                max={today}
                onChange={handleDateChange}
              />
              {errors.date && <p className="form__error">{errors.date}</p>}
            </div>
          </div>
          <div className="form__input-group">
            <label htmlFor="game" className="form__label">
              Game
            </label>
            <div className="input">
              <input
                name="game"
                id="game"
                type="text"
                className="form__input"
                onChange={handleGameChange}
              />
              {errors.game && <p className="form__error">{errors.game}</p>}
            </div>
          </div>
          <div className="form__input-group">
            <p className="form__label">Select stat:</p>
            <div className="input">
              <Select
                options={options}
                isMulti
                name="selectStats"
                id="selectStats"
                onChange={handleSelectChange}
                placeholder="Select stats"
                isClearable
              />
              {selectedOptions.map((option) => (
                <div key={option.value} style={{ marginBottom: "10px" }}>
                  <label htmlFor={option.value}>{option.label}</label>
                  <input
                    type="number"
                    id={option.value}
                    name={option.value}
                    value={formData[option.value] || ""}
                    onChange={(event) => handleInputChange(event, option.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="stats__buttons">
            <button className="profile__button">Cancel</button>
            <button className="profile__button">Add Stats</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddStatsForm;

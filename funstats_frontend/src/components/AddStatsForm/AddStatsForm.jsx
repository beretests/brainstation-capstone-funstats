import DatePicker from "react-datepicker";
import "./AddStatsForm.scss";
import { useState } from "react";
import Select from "react-select";
import { options } from "../../data/data";

function AddStatsForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({});

  const errorMessages = {
    game: "",
    selectStat: "",
  };
  const [error, setError] = useState(errorMessages);
  const [game, setGame] = useState("");

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleKeyDown = (event) => {
    if (["e", "-", "+"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    setFormData({
      ...formData,
      [name]: event.target.value,
      // date: selectedDate,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (game === "" || !selectedOptions || !selectedDate) {
    //   setError("This field cannot be empty");
    // } else {
    //   setError("");
    // }

    if (selectedDate && selectedOptions) {
      setFormData({
        date: Math.floor(selectedDate.getTime() / 1000),
        ...formData,
      });
    } else {
      alert("Please select a date");
      return;
    }

    console.log(formData);
    event.target.reset();
  };

  return (
    <>
      <section className="stats">
        <h2 className="stats__title">Stats</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="date" className="form__label">
            Date
            <DatePicker
              name="date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              maxDate={new Date()}
            />
          </label>
          <label htmlFor="game" className="form__label">
            Game
            <input
              name="game"
              id="game"
              type="text"
              className="form__input"
              onChange={handleInputChange}
            />
            {error && <p className="form__error">{error.game}</p>}
          </label>
          <label htmlFor="selectStats" className="form__label">
            {" "}
            Select stat:
            <Select
              options={options}
              isMulti
              name="selectStats"
              id="selectStats"
              onChange={handleSelectChange}
              placeholder="Select stats"
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
          </label>
          <div className="stats__buttons">
            <button className="form__button">Cancel</button>
            <button className="form__button">Add Stats</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddStatsForm;

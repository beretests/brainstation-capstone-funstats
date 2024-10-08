import "./AddStatsForm.scss";
import { options } from "../../data/data";
import { Form, Button } from "react-bootstrap";

function AddStatsForm({ handleSubmit, setFormData, formData }) {
  const today = new Date().toISOString().split("T")[0];

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, selectedOptions });
  };

  const handleOptionValueChange = (option, e) => {
    setFormData({
      ...formData,
      optionValues: {
        ...formData.optionValues,
        [option]: e.target.value,
      },
    });
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      date: value,
    });
  };

  const handleGameChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, game: value });
  };

  return (
    <>
      <section className="stats">
        <h3 className="stats__title">Enter new game stat</h3>
        <Form onSubmit={handleSubmit} className="stats__form-add">
          {/* <Form.Group className="mb-3" controlId="formDate">
            <Form.Label className="stats__date-label">DATE</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              max={today}
              onChange={handleDateChange}
            />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label className="stats__date-label">DATE</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              max={today}
              onChange={handleDateChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGame">
            <Form.Label>GAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name of game"
              onChange={handleGameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStat">
            <Form.Label>SELECT STAT TO ADD:</Form.Label>
            <Form.Select
              multiple
              onChange={handleSelectChange}
              placeholder="Select stats"
            >
              {options.map((stat, index) => (
                <option key={index} value={stat.value}>
                  {stat.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {formData.selectedOptions.map((option) => (
            <Form.Group controlId={`formOptionValue-${option}`} key={option}>
              <Form.Label>{option.replace(/_/g, " ").toUpperCase()}</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={formData.optionValues[option] || ""}
                onChange={(e) => handleOptionValueChange(option, e)}
                className="stats__input"
                required
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-6 stats__button-container">
            <Button type="submit" className="stats__button">
              Add Stats
            </Button>
          </Form.Group>
        </Form>
      </section>
    </>
  );
}

export default AddStatsForm;

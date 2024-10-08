import "./SelectSeasonModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";

function SelectSeasonModal({ show, seasons, handleClose }) {
  const { setSeason, playerId } = useAuth();
  //   const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const [selectedSeason, setSelectedSeason] = useState("");
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleSubmit = () => {
    setSeason(selectedSeason);
    navigate(`/player/${playerId}/stats/${selectedSeason}`);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a game season</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            onChange={handleSelectChange}
            placeholder="Select season"
          >
            <option>Open this select menu</option>
            <option value="">Choose season...</option>
            {seasons.map((season, index) => (
              <option key={index} value={season.season}>
                {season.season}
              </option>
            ))}
            <option value="add-new">Add new season...</option>
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={handleSubmit}>
            View Stats
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SelectSeasonModal;

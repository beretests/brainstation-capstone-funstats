import "./SignUpPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { positions } from "../../data/data";

function SignUpPage() {
  const [formData, setFormData] = useState({
    DOB: "",
    username: "",
    name: "",
    password: "",
    position: "Goalkeeper",
  });
  const url = import.meta.env.VITE_API_URL;
  // TODO: signup requests should go to the signup auth route
  const signupUrl = `${url}/player/add`;
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handleNameChange = (e) => {
    const name =
      e.target.value.charAt(0).toUpperCase() +
      e.target.value.slice(1).toLowerCase();
    setFormData({ ...formData, name: name });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      DOB: Math.floor(new Date(e.target.value).getTime() / 1000),
    });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, position: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data: ", JSON.stringify(formData));
      await axios.post(signupUrl, formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <h2 className="signup__heading">Sign Up</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group as={Row} className="mb-3" controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder=" Full Name"
              onChange={handleNameChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDate">
          <Form.Label column sm={2}>
            Date of Birth
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" onChange={handleDateChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPosition">
          <Form.Label column sm={2}>
            Position
          </Form.Label>
          <Col sm={10}>
            <Form.Select onChange={handleSelectChange}>
              {positions.map((position, index) => (
                <option key={index} value={position.value}>
                  {position.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPicture">
          <Form.Label column sm={2}>
            Upload picture
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign up</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUpPage;

import "./SignUpPage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { positions } from "../../data/data";

function SignUpPage() {
  const [validated, setValidated] = useState(false);
  const [picPublicUrl, setPicPublicUrl] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    DOB: "",
    username: "",
    name: "",
    password: "",
    position: "",
    profile_pic: "",
  });
  const url = import.meta.env.VITE_API_URL;
  // TODO: signup requests should go to the signup auth route
  const signupUrl = `${url}/player/add`;
  const navigate = useNavigate();

  async function getImagePublicUrl() {
    const uploadUrl = `${url}/presigned-url`;
    const response = await axios.post(uploadUrl, {
      contentLength: profilePic.size,
      fileName: profilePic.name,
      fileType: profilePic.type,
    });
    const { signedUrl, publicUrl } = response.data;
    await axios.put(signedUrl, profilePic, {
      headers: {
        "Content-Type": profilePic.type,
      },
    });
    setPicPublicUrl(publicUrl);
  }

  useEffect(() => {
    if (profilePic) {
      getImagePublicUrl();
    }
  }, [profilePic]);

  useEffect(() => {
    if (picPublicUrl) {
      setFormData({ ...formData, profile_pic: picPublicUrl });
      console.log("Public url: ", picPublicUrl);
      console.log("Form Data: ", formData);
    }
  }, [picPublicUrl]);

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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleSignup = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

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
      <Form noValidate validated={validated} onSubmit={handleSignup}>
        <Form.Group as={Row} className="mb-3" controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type="text"
              placeholder=" Full Name"
              onChange={handleNameChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your full name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDate">
          <Form.Label column sm={2}>
            Date of Birth
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="date" onChange={handleDateChange} />
            <Form.Control.Feedback type="invalid">
              Please choose your date of birth.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPosition">
          <Form.Label column sm={2}>
            Position
          </Form.Label>
          <Col sm={10}>
            <Form.Select required onChange={handleSelectChange}>
              {positions.map((position, index) => (
                <option key={index} value={position.value}>
                  {position.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your best playing position.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPicture">
          <Form.Label column sm={2}>
            Upload picture
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" onChange={handleUpload} />
            {picPublicUrl && <p>Uploaded file: {profilePic.name}</p>}
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

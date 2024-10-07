import "./LoginPage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function LoginPage({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const loginUrl = `${url}/login`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true and false
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const response = await axios.post(loginUrl, {
        username: form.formBasicUsername.value,
        password: form.formBasicPassword.value,
      });
      sessionStorage.setItem("JWTtoken", response.data.token);
      sessionStorage.setItem("userId", response.data.id);
      const id = response.data.id;
      setIsLoggedIn(true);

      navigate(`/player/${id}`, {
        state: {
          message:
            "Successfully logged in. You can now view and update your stats as well as add friends to compare your stats!",
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="login">
      <h2 className="login__heading">Login</h2>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>

          <Form.Control required type="text" placeholder="Enter username" />
          <Form.Control.Feedback type="invalid">
            Please enter your username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              // variant="outline-secondary"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;

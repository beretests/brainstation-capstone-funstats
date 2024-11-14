import "./LoginPage.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  InputGroup,
  Alert,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useAuth } from "../../utils/authProvider";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const { login, playerId } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const loginUrl = `${url}/login`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      login(
        sessionStorage.getItem("JWTtoken"),
        sessionStorage.getItem("userId")
      );
      const id = sessionStorage.getItem("userId");
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
      <Card className="text-center" border="primary">
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{errorMessage}</p>
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control required type="text" placeholder="Enter username" />
              <Form.Control.Feedback type="invalid">
                Please enter your username.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
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
            </Col>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;

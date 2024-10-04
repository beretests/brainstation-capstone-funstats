import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const loginUrl = `${url}/login`;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        loginUrl,
        {
          username: e.currentTarget.formBasicUsername.value,
          password: e.currentTarget.formBasicPassword.value,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "1",
            "Origin": "window.location.origin",
          },
        }
      );
      sessionStorage.setItem("JWTtoken", response.data.token);
      sessionStorage.setItem("userId", response.data.id);
      const id = response.data.id;
      setIsLoggedIn(true);

      navigate(`/player/${id}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="login">
      <h2 className="login__heading">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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

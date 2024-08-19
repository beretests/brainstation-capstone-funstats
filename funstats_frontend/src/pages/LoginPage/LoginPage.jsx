import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginPage({ setIsLoggedIn }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const loginUrl = `${url}/login`;
  // const profileUrl = `${url}/profile`;

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget.formBasicUsername.value);

    try {
      const response = await axios.post(loginUrl, {
        username: e.currentTarget.formBasicUsername.value,
        password: e.currentTarget.formBasicPassword.value,
      });
      // console.log(response);
      sessionStorage.setItem("JWTtoken", response.data.token);
      sessionStorage.setItem("userId", response.data.id);
      const id = response.data.id;

      // setIsLoggedIn(true);
      // setIsLoginError(false);
      // setErrorMessage("");
      navigate(`/player/${id}`);
    } catch (error) {
      setIsLoginError(true);
      // setErrorMessage(error.response.data.error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* <Form.Check type="checkbox" label="Check me out" /> */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>

    // <div>
    //   <h1>Login</h1>
    //   {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
    //   <form onSubmit={handleLogin}>
    //     <div className="form-group">
    //       Username: <input type="text" name="username" />
    //     </div>
    //     <div className="form-group">
    //       Password: <input type="password" name="password" />
    //     </div>
    //     <button className="btn btn-primary" type="submit">
    //       Login
    //     </button>
    //   </form>
    // </div>
  );
}

export default LoginPage;

import "./SignUpPage.scss";
import { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const signupUrl = `${url}/signup`;

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(signupUrl, {
        username: e.target.username.value,
        name: e.target.name.value,
        password: e.target.password.value,
        DOB: e.target.date.value,
        position: e.target.position.value,
      });
      setIsSignedUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Name: <input type="text" name="name" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <div className="form-group">
          Date of Birth: <input type="date" name="date" />
        </div>
        <div className="form-group">
          Position: <input type="select" name="position" />
        </div>
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;

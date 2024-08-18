import heroImage from "./../../assets/images/hero.jpg";
import "./HomePage.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function HomePage() {
  const url = import.meta.env.VITE_API_URL;
  const loginUrl = `${url}/login`;
  const signupUrl = `${url}/signup`;
  // console.log(url);

  // const location = useLocation();
  //   const { warehouseId } = useParams();

  //   if (location.pathname === "/warehouse/addNewWarehouse") {
  //       return (
  //           <AddNewWarehousePage />
  //       )
  //   } else if (location.pathname === `/warehouse/editWarehouse/${warehouseId}`) {
  //       return (
  //           <EditWarehousePage />
  //       )
  //   } else if (location.pathname === `/warehouse/${warehouseId}`) {
  //       return (
  //           <WarehouseDetailsPage />
  //       )
  //   } else {
  //       return (
  //           <WarehouseList />
  //       )
  //   }

  // const [isSignedUp, setIsSignedUp] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoginError, setIsLoginError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post(signupUrl, {
  //       username: e.target.username.value,
  //       name: e.target.name.value,
  //       password: e.target.password.value,
  //     });
  //     setIsSignedUp(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(loginUrl, {
  //       username: e.target.username.value,
  //       password: e.target.password.value,
  //     });
  //     sessionStorage.setItem("JWTtoken", response.data.token);

  //     setIsLoggedIn(true);
  //     setIsLoginError(false);
  //     setErrorMessage("");
  //   } catch (error) {
  //     setIsLoginError(true);
  //     setErrorMessage(error.response.data.error.message);
  //   }
  // };

  const navigate = useNavigate();
  const id = "3aa3a66a-bc1d-4f52-83fc-88d39e2a1cce";
  const handleClick = async (id) => {
    try {
      const data = await axios.get(`${url}/player/${id}`);
      navigate(`/player/${id}`, { state: { data: data.data } });
    } catch (err) {
      alert("Error: ", err);
    }
  };

  return (
    <>
      <div className="home">
        <div className="home__blurb-container">
          <h1 className="home__page-header">FunStats App</h1>
          <h2 className="home__subheader">
            Goals, Stats and Friendly Rivalries!
          </h2>
          <p className="home__body">
            Track your stats, challenge your friends and earn points that can be
            redeemed for rewards
          </p>
          <div className="home__button-container">
            {/* <button className="home__button" onClick={() => handleClick(id)}>
          View Profile
        </button> */}
            <Link to="/sign_up">
              <button className="home__button">Register</button>
            </Link>
            <Link to="/sign_in">
              <button className="home__button">Login</button>
            </Link>
          </div>
        </div>
        <div className="home__image-container">
          <img
            src={heroImage}
            alt="kids around a soccer ball"
            className="home__hero-image"
          />
        </div>
        <div className="home__button-layout">
          {/* <button className="home__button" onClick={() => handleClick(id)}>
            View Profile
          </button> */}
          <Link to="/sign_up">
            <button className="home__button">Register</button>
          </Link>
          <Link to="/sign_in">
            <button className="home__button">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;

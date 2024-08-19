import heroImage from "./../../assets/images/hero.jpg";
import "./HomePage.scss";
import { Link } from "react-router-dom";

function HomePage() {
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

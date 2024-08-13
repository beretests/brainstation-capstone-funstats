import React from "react";
import heroImage from "./../../assets/images/hero.jpg";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <div className="home">
        <div className="home__image-container">
          <img
            src={heroImage}
            alt="kids around a soccer ball"
            className="home__hero-image"
          />
        </div>
        <div className="home__blurb-container">
          <h1 className="home__page-header">FunStats App</h1>
          <h2 className="home__subheader">
            Goals, Stats and Friendly Rivalries!
          </h2>
        </div>
      </div>
    </>
  );
}

export default HomePage;

import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [active, setActive] = useState(false);
  return (
    <header className="header">
      {/* <div className="header__logo"> */}
      <NavLink to="/" className="header__logo">
        <img
          className="header__logo-image"
          src="/funstats-logo-raisinblack.png"
          alt="FunStats logo"
        />
        <h1 className="header__title">FunStats</h1>
      </NavLink>
      {/* </div> */}
      <div className="header__links">
        <NavLink
          to="/"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/player/:id"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/player/:id/stats"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Stats
        </NavLink>
        <NavLink
          to="/player/:id/friends"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Friends
        </NavLink>
        <NavLink
          to="/player/:id"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Login
        </NavLink>
      </div>
    </header>
  );
}

export default Header;

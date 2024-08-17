import "./Header.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img
          className="header__logo-image"
          src="/funstats-logo-raisinblack.png"
          alt="FunStats logo"
        />
        <h1 className="header__title">FunStats</h1>
      </Link>
      <HamburgerMenu />
      {/* <div className="header__links">
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
      </div> */}
    </header>
  );
}

export default Header;

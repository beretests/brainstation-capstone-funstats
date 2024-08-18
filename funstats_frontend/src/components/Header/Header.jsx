import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import ListGroup from "react-bootstrap/ListGroup";

function Header() {
  // const [active, setActive] = useState(false);

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
      {/* <HamburgerMenu /> */}
      {/* <div className="header__links"> */}
      <nav className="header__links">
        <NavLink
          to="/player/:id"
          className={(isActive) =>
            "header__item" + (isActive ? "header__item--active" : "")
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/player/:id/stats"
          className={(isActive) =>
            "header__item" + (isActive ? "header__item--active" : "")
          }
        >
          Stats
        </NavLink>
        <NavLink
          to="/contact"
          className={(isActive) =>
            "header__item" + (isActive ? "header__item--active" : "")
          }
        >
          Friends
        </NavLink>
      </nav>
      {/* <Link
          to="/player/:id"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Profile
        </Link>
        <Link
          to="/player/:id/stats"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Stats
        </Link>
        <Link
          to="/player/:id/friends"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Friends
        </Link> */}
      {/* <Link
          to="/player/:id"
          className={
            active ? "header__item header__item--active" : "header__item"
          }
        >
          Login
        </Link> */}
      {/* </div> */}
    </header>
  );
}

export default Header;

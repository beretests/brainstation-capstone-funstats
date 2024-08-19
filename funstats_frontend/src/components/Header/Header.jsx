import "./Header.scss";
import { NavLink, Link } from "react-router-dom";

function Header({ id }) {
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

      {id ? (
        <nav className="header__links">
          <NavLink
            to={`/player/${id}`}
            className={(isActive) =>
              "header__item" + (isActive ? "header__item--active" : "")
            }
          >
            Profile
          </NavLink>
          <NavLink
            to={`/player/${id}/stats`}
            className={(isActive) =>
              "header__item" + (isActive ? "header__item--active" : "")
            }
          >
            Stats
          </NavLink>
        </nav>
      ) : (
        <nav className="header__links">
          <NavLink to={`/sign_up`}>Sign Up</NavLink>
          <NavLink to={`/sign_in`}>Log in</NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;

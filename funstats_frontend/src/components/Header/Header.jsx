import "./Header.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";

function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, playerId } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    logout();
    navigate("/");
  };

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

      {isAuthenticated ? (
        <nav className="header__links">
          <NavLink
            to={`/player/${playerId}`}
            className={(isActive) =>
              "header__item" + (isActive ? "header__item--active" : "")
            }
          >
            Profile
          </NavLink>
          <NavLink
            to={`/player/${playerId}/friends`}
            className={(isActive) =>
              "header__item" + (isActive ? "header__item--active" : "")
            }
          >
            Friends
          </NavLink>
          <NavLink
            to={"/"}
            className={(isActive) =>
              "header__item" + (isActive ? "header__item--active" : "")
            }
            onClick={handleLogout}
          >
            Logout
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

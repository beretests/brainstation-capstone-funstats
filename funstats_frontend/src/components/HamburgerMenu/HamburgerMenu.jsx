import { useState } from "react";
import "./HamburgerMenu.scss";
import { Link } from "react-router-dom";
// import hamburgerIcon from "./menu.png";
// import closeIcon from "./cross-mark.png";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu-container">
      <img
        src={isOpen ? "/cross-mark.png" : "/menu.png"}
        alt={isOpen ? "Close Menu" : "Open Menu"}
        className="hamburger-icon"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            <>
              <Link
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
              </Link>
              <Link
                to="/logout"
                className="header__item"
                onClick={handleLoginLogout}
              >
                Logout
              </Link>
              {/* <a href="#logout" >
                Logout
              </a> */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="header__item"
                onClick={handleLoginLogout}
              >
                Login
              </Link>
              <Link to="/sign_up" className="header__item">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;

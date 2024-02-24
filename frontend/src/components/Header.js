import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import headerLogo from "../images/Vector_Around.png";

export default function Header({ isLoggedIn, handleLogout, userEmail }) {
  const location = useLocation();
  const history = useHistory();
  const [stateScreen, setStateScreen] = useState(false);
  const [widthscreen, setWidthscreen] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false); 
  
  function SignOut() {
    handleLogout();
    localStorage.removeItem("jwt");
    history.push("/login");
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      setWidthscreen(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setStateScreen(widthscreen <= 588);
    if (widthscreen > 588) {
      setMenuOpen(false);
    }
  }, [widthscreen]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <>
      <header className="header">
        {(menuOpen) &&
          isLoggedIn &&
          location.pathname === "/profile" && (
            <div className="header__container--open">
              <p className="header__menu-email">{userEmail}</p>
              <button onClick={SignOut} className="header__menu-button">
                Sair
              </button>
              {menuOpen && <div className="header__line"></div>}
            </div>
          )}
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="logo do site" />
          <div className="header__menu">
            {location.pathname === "/login" && (
              <Link to="/register" className="header__menu-button">
                Entrar
              </Link>
            )}

            {location.pathname === "/register" && (
              <Link to="/login" className="header__menu-button">
                Faça o login
              </Link>
            )}

            {!stateScreen && isLoggedIn && location.pathname === "/profile" && (
              <div className="header__menu-container">
                <p className="header__menu-email">{userEmail}</p>
                <button onClick={SignOut} className="header__menu-button">
                  Sair
                </button>
                {menuOpen && <div className="header__line"></div>}
              </div>
            )}
            {stateScreen && isLoggedIn && location.pathname === "/profile" && (
              <div className="header__menu-container__sandwich">
                <button
                  className={`header__menu-button ${
                    menuOpen
                      ? "header__menu-button-close"
                      : "header__menu-button-open"
                  }`}
                  onClick={toggleMenu}
                ></button>
              </div>
            )}
          </div>
        </div>

        <div className="header__line"></div>
      </header>
    </>
  );
}

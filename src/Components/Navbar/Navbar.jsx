import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";
import logo from "../../images/Logo.png";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
export default function Navbar({ loggedInUser }) {
  const [t,i18n   ]=useTranslation();
  if (loggedInUser) {
    console.log(loggedInUser.role);
  }

  const dispatch = useDispatch();

  return (
    <div className={style.navBar}>
      <nav className="navbar navbar-expand-lg bg-white navbar-dark">
        <div className="container">
          <NavLink to={"/home"}>
            <img src={logo} alt="Logo" className={style.logo} />
          </NavLink>
          <button
            className="navbar-toggler toggler-example bg-success px-3 py-2"
            type="button"
            data-toggle="collapse"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="dark-blue-text">
              <i className="fas fa-bars fa-1x"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="list-unstyled d-flex navbar-nav ms-auto gap-2">
              <li className="px-2 nav-item h5 fontTik">
                <NavLink
                  to="/home"
                  className={(home) => (home.isActive ? style.active : null)}
                >
                  {t("Home")}
                </NavLink>
              </li>

              <li className="px-2 nav-item h5 fontTik">
                <NavLink
                  to="/discover"
                  className={(home) => (home.isActive ? style.active : null)}
                >
                  {t("Courts")}
                </NavLink>
              </li>

              {loggedInUser && (
                <>
                  {loggedInUser?.role !== "Player" ? (
                    <>
                      <li className="px-2 nav-item h5 fontTik">
                        <NavLink
                          to="/owner-profile"
                          className={(profile) =>
                            profile.isActive ? style.active : null
                          }
                        >
                          {t("Profile")}
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}

              {/* This is if the loggedInUser a Player */}
              {loggedInUser && (
                <>
                  {loggedInUser?.role === "Player" ? (
                    <>
                      <li className="px-1 nav-item h5 fontTik">
                        <NavLink
                          to="/player-profile"
                          className={(profile) =>
                            profile.isActive ? style.active : null
                          }
                        >
                          {t("Profile")}
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}

              <li className="px-2 nav-item h5 fontTik">
                <NavLink
                  to="/about"
                  className={(home) => (home.isActive ? style.active : null)}
                >
                  {t("About")}
                </NavLink>
              </li>
              <li className="px-2 nav-item h5 fontTik">
                {i18n.language==="en"&&<input
                  type="button"
                  variant="outline-success"
                  value="Ar"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                  className="btn btn-success"
                ></input>}{" "}
                {i18n.language==="ar"&&<input
                  type="button"
                  variant="outline-success"
                  value="En"
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                  className="btn btn-success "
                ></input>}{" "}
              </li>
            </ul>

            <ul className="list-unstyled d-flex navbar-nav ms-auto">
              {loggedInUser ? (
                <>
                  <li className="px-2 nav-item h5 fontTik">
                    <NavLink
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.removeItem("userToken"); //Remove the token from Local Storage
                        dispatch({ type: "setLoggedInUser", payload: null });
                      }}
                      to="/login"
                    >
                      {t("Logout")}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item px-2 h5 fontTik">
                    <NavLink to="/login">{t("Login")}</NavLink>
                  </li>
                  <div className="btn-group rounded-pill">
                    <button
                      type="button"
                      className="btn btn-success dropdown-toggle rounded-pill "
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {t("Register")}
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item px-2 btn btn-outline-success rounded-pill nav-item">
                        <NavLink to="/register">
                          {t("Register as Player")}
                        </NavLink>
                      </li>
                      <li className="dropdown-item px-2 btn btn-outline-success rounded-pill nav-item">
                        <NavLink to="/owner-register">
                          {t("Register as owner")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

import React from "react";
import image from "../../images/player.svg";
import style from "./landing.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next"
export default function Landing() {
  const [t,i18n]=useTranslation();

  const loggedInUser = useSelector((state) => state);
  return (
    <div className="container myBody">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6">
          {loggedInUser ? (
            <>
              {" "}
              <h2 className="fontTik mt-lg-5 mt-5">
              {t("Welcome")}{" "}
                <span className={style.user_name_span}>
                  {" "+loggedInUser.fullName+" "}
                </span>{" "}
                {t("to")} {t("Arena")}. 
                
              </h2>
              <br />
            </>
          ) : (
            <h1 className="mt-lg-5 mt-5 fontTik">
              {t("Welcome to")}  {t("Arena")} .
            </h1>
          )}
          <h3 className={style.text}>{t("More than just a Platform.")}</h3>
          <h4 className="fontTik mt-3">
          {t("This platform aims to ease the reservation of soccer courts")}
          </h4>
          <div>
            <NavLink
              className="btn btn-success p-3 mt-2 fontTik"
              role="button"
              to="/discover"
            >
              {t("Discover Courts")}
            </NavLink>
          </div>
        </div>
        <div className="col-lg-6 d-lg-block d-none">
          <img src={image} alt="" className="mt-5 w-100" />
        </div>
      </div>
    </div>
  );
}

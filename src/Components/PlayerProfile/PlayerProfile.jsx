import React, { useState } from "react";
import { redirect } from "react-router-dom";
import LastGames from "./LastGames";
import MainProfile from "./MainProfile";
import UpcomingGames from "./UpcomigGames";
import style from "./PlayerProfile.module.css";
import { useTranslation } from 'react-i18next';

export default function PlayerProfile() {
  const [showGames, setshowGames] = useState(false);
  const [showUGames, setshowUGames] = useState(false);
  const [showProfile, setshowProfile] = useState(true);
  const [activeLast, setActiveLast] = useState(false);
  const [activeUpcoming, setActiveUpcoming] = useState(false);

  function ShowLastGame() {
    setshowGames(true);
    setshowUGames(false);
    setshowProfile(false);
    setActiveLast(true);
    setActiveUpcoming(false);
  }
  function ShowUpcomingGame() {
    setshowGames(false);
    setshowUGames(true);
    setshowProfile(false);
    setActiveLast(false);
    setActiveUpcoming(true);
  }
  function ShowProfile() {
    setshowGames(false);
    setshowUGames(false);
    setshowProfile(true);
    setActiveLast(false);
    setActiveUpcoming(false);
  }
  const [t,i18n]=useTranslation();


  return (
    <>
      <div className={style.inputs}>
        {!showProfile && (
          <div className="btn btn-outline-success" onClick={ShowProfile}>
            {t("Back To Profile")}
          </div>
        )}
        <input
          className="btn btn-outline-success"
          type="submit"
          value={t("My Last Games")}
          onClick={ShowLastGame}
          style={{ backgroundColor: activeLast ? "#dedede" : "" }}
        />

        <input
          className="btn btn-outline-success"
          type="submit"
          value={t("Upcoming Games")}
          onClick={ShowUpcomingGame}
          style={{ backgroundColor: activeUpcoming ? "#dedede" : "" }}
        />
      </div>

      {/* /////////////////////////////////////////////////////////////////////////// Games */}

      {showGames && <LastGames />}
      {showUGames && <UpcomingGames />}
      {showProfile && <MainProfile />}
      {/* ///////////////// */}
    </>
  );
}

export function routeProtectionLoader() {
  if (localStorage.getItem("userToken")) {
    return null;
  } else return redirect("/login");
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function UpcomingGames() {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  const [upcoming, setupcoming] = useState([]);

  const [counterToUpdate, setCounterToUpdate] = useState(0);

  const date = new Date();
  let hour = date.getHours();

  let MyDateString =
    date.getFullYear() +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2);

  let playerToken = localStorage.getItem("userToken");
  let playerData = jwtDecode(playerToken);
  useEffect(() => {
    async function UpcomingGamesData() {
      // TODO change url with this url to get prev games only

      let { data } = await axios.get(
        `/games/user/nextGames/${playerData.userID}`);
      console.log(data);
      setupcoming(data);

    }
    UpcomingGamesData();
  }, [counterToUpdate]);
  const [t, i18n] = useTranslation();

  return (
    <div>
      <MDBContainer className="my-5 ">
        <MDBRow>
          {upcoming?.length == 0 && (
            <div className="text-center ">
              {" "}
              <h3 className="m-5">
                {t("You don't have upcoming games, start reserving you game now!")}
              </h3>
              <NavLink to={"/discover"}>
                <div className="btn btn-outline-success mt-4">
                  {t("Discover Courts Now")}
                </div>
              </NavLink>
            </div>
          )}
          {upcoming?.map((u, index) => (
            <MDBCol md="12" lg="4" className="mb-4 mb-lg-0 pb-3" key={index}>
              <MDBCard>
                <div className="d-flex justify-content-center p-3">
                  <p className="lead mb-0">
                    {u.fieldName}
                  </p>
                </div>
                {u.fieldImages ? <>
                  <MDBCardImage
                    className="p-4 img-fluid"
                    src={`${image}/${u?.fieldImages[0]}`}
                    position="top"

                  />
                </> : <><span>No image here</span></>}
                <MDBCardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">{t("Price")}</h5>
                    <h5 className="text-dark mb-0">
                      {u.price} {t("EGP/Hour")}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      {t("Day")}: <span className="fw-bold">{u.date}</span>
                      <br />
                      {t("Time")}:{" "}
                      <span className="fw-bold">
                        {u.hour < 12
                          ? `${u.hour}-${u.hour + 1} AM`
                          : `${u.hour - 12}-${u.hour + 1 - 12} PM`}
                      </span>
                    </p>
                    <div className="ms-auto text-secondary">
                      <div>
                        <input
                          className="btn btn-outline-danger"
                          type="button"
                          value={t("Delete Game")}
                          onClick={() => {
                            let msg = window.confirm("Delete the item?");
                            if (msg) {
                              if (u.date > MyDateString) {
                                async function deleteGame() {
                                  await axios.delete(
                                    `/games/delete/${u._id}`
                                  );
                                }
                                deleteGame()
                                setCounterToUpdate((old) => old + 1)
                                window.alert("Game Deleteed Successfully")
                              } else if (u.date < MyDateString) {
                                //   console.log(u.date + " less " + MyDateString);
                                //   alert("you cant delete game 6 hours minimum")
                              } else {
                                if (u.hour > hour + 6) {
                                  async function deleteGame() {
                                    await axios.delete(
                                      `/games/delete/${u._id}`
                                    );
                                  }
                                  deleteGame();
                                  setCounterToUpdate((old) => old + 1);
                                  window.alert("Game Deleteed Successfully")

                                } else {
                                  alert(
                                    "Sorry!, you must delete game before it's time 6 hours at least"
                                  );
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

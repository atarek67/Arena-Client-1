import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Rating from "@mui/material/Rating";
import jwtDecode from "jwt-decode";
import { useTranslation } from 'react-i18next';

const FieldReservations = () => {
  const [t, i18n] = useTranslation();
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  let [field, setField] = useState([]);
  const { fieldID } = useParams();
  useEffect(() => {
    async function getField() {
      let { data } = await axios.get(`/fields/${fieldID}`);
      setField(data);
    }
    getField();
  }, [fieldID]);
  const games = useLoaderData();
  // medhat
  var OwnerToken = localStorage.getItem("userToken");
  var ownerData = jwtDecode(OwnerToken);
  //   console.log(ownerData.userID);
  //   console.log(games)
  // console.log(field.images)


  return (
    <>
      <div className="m-5 text-center">
        <NavLink to={`/my-fields`}>
          <input
            className="btn btn-outline-success"
            type="button"
            value={t("Back To All Fields")}
          />
        </NavLink>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            {/* Carousel Section */}
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="m-3 img-fluid"
            >
              {field.images?.map((i, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`${image}/${i}`}
                    alt="First slide"
                  />


                </Carousel.Item>

              ))}
            </Carousel>


            {/* Comments Section */}

            {/* Check if there is game aslan */}
            {games?.length !== 0 ? (
              <>
                <h5 className="card-title text-center ">
                  {t("Last Resvervation details")}{" "}
                </h5>
                <div className="card text-center m-4" key={index}>
                  {games.map((u, index) => (
                    <div key={index}>
                      {/* Check if there is comment */}
                      {u.comment?.length !== 0 && (
                        <>
                          <div className="card-body ">
                            {/* <h5>Comments</h5> */}

                            <span className="card-subtitle mb-2 text-muted ">
                              "{u.userFullName}":{" "}
                              <span className="text-dark h6">{u.comment}</span>
                            </span>

                            {/* Check is there is complain */}

                            {/* Check for Rating */}
                            {u.rate?.length !== 0 && (
                              <>
                                {/* <h5>Rating</h5> */}
                                <div className="text-center">
                                  {/* <span className="h6"> {u.userFullName} </span> */}
                                  <span className="card-subtitle text-muted">
                                    <Rating
                                      className=""
                                      name="read-only"
                                      value={parseInt(u.rate)}
                                      readOnly
                                    />
                                  </span>
                                </div>
                              </>
                            )}
                            {u.complain !== "" ? (
                              <>
                                <hr />
                                <h5>{t("Complain")}</h5>
                                <span className="card-subtitle mb-2 text-muted ">
                                  {/* "{u?.userFullName}": */}
                                  <span className="text-dark h6">
                                    {u.complain}
                                  </span>
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    //
                  ))}
                </div>
              </>
            ) : (
              <>
                <h5 className="text-dark mt-3 h4 text-center">
                  {t("No reviews or rating yet")}
                </h5>
              </>
            )}
          </div>
          {/* Field Details */}

          <div className="col-lg-6 col-12">
            <div className="card m-4" key={index}>
              <div className="card-body text-center">
                <h5 className="card-title h2 text-success">
                  {t("Field Details")}
                </h5>
                <hr />
                <h6 className="card-subtitle m-2 h4">
                  {t("Name")}: {field.fieldName}
                </h6>
                <h6 className="card-subtitle m-2 h4">
                  {t("Price")}: {field.price} {t("EGP/Hour")}
                </h6>
                <a href={field.locationOnMap} target="_blank">
                  <i
                    className="fa fa-map-marker text-success"
                    aria-hidden="true"
                  ></i>
                  <span className="card-subtitle m-2 h5 text-success">
                    {t("Location on Map")}

                  </span>
                </a>
              </div>
            </div>
            <hr />

            {/* Coming Games inshallah */}

            <h5 className="card-title text-center">
              {t("Upcoming reservations details")}
              {/* 7ogozat we badal games tb2a reservation */}
            </h5>

            {games?.length === 0 && (
              <>
                <div className="text-center bg-warning mt-5 rounded-pill h5 p-2 ">
                  {t("No reservation yet")}
                </div>
              </>
            )}

            <div className="row justify-content-center">
              {games.map((f, index) => (
                <div
                  className="card m-4 col-lg-4 col-10 text-center"
                  key={index}
                >
                  <div className="card-body text-center">
                    <h6 className="card-subtitle mb-2 text-muted">
                      {t("Date")}: {f.date}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {t("From")}:
                      <span className="fw-bold ">
                        {f.hour < 12
                          ? ` ${f.hour}-${f.hour + 1} AM`
                          : ` ${f.hour - 12}-${f.hour + 1 - 12} PM`}
                      </span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {/* medhat */}
                      {t("Name")}:{" "}
                      {ownerData.userID == f.userId ? "Me" : f.userFullName}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldReservations;

export async function FieldReservationsLoader({ params }) {
  let { data } = await axios.get(
    `/games/field/${params.fieldID}`
  );
  return data;
}

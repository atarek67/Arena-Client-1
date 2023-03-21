import React, { useEffect } from "react";
import { useState } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Modal from "../Owner Profile/Modal";
import jwtDecode from "jwt-decode";
import style from "./courtDetails.module.css";
import { useNavigate } from "react-router";
// import CardForm from "./Payment/CardForm";

import sign from "jwt-encode";
import { useTranslation } from 'react-i18next';
const ReservationForm = ({ fieldId, fieldName, price }) => {
  const [t, i18n] = useTranslation();
  let [game, setGame] = useState({
    userFullName: "",
    userId: "",
    fieldId: fieldId,
    fieldName: fieldName,
    price: price,
    date: "",
    hour: 0,
  });
  let [data, setData] = useState("");
  let [paymentIsVisible, setPaymentIsVisible] = useState(false);
  let [field, setField] = useState("");
  let [fieldCalenderDay, setFieldCalenderDay] = useState([]);
  let [fieldCalenderHour, setFieldCalenderHour] = useState([]);
  let [reservedHours, setReservedHours] = useState([]);
  let [availableHours, setAvailableHours] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      let myData = await axios.get(
        `/games/field/${fieldId}`
      );
      let field = await axios.get(
        `/fields/calender/${fieldId}`
      );
      setField(field);
      setData(myData);
      setFieldCalenderHour(field.data.calender);
      setFieldCalenderDay(
        field.data.calender?.map((f) => f.date.replaceAll("/", "-"))
      );
    }
    getData();
  }, [reservedHours]);

  var OwnerToken = localStorage.getItem("userToken");
  var ownerData = jwtDecode(OwnerToken);

  const [showError, setShowError] = useState(false);
  let gameSchema = {
    userFullName: Joi.required(),
    userId: Joi.required(),
    fieldId: Joi.string().required(),
    fieldName: Joi.string().required(),
    price: Joi.required(),
    date: Joi.required(),
    hour: Joi.number().required(),
  };

  useEffect(() => {
    if (game.date) {
      if (fieldCalenderHour) {
        setReservedHours(
          fieldCalenderHour.find(
            (elem) => elem.date == game.date.replaceAll("-", "/")
          )?.reservedHours
        );
      }
    }
  }, [game.date]);
  console.log("***********");
  console.log(ownerData.fullName);

  async function formSubmit(e) {
    e.preventDefault();
    let gamee = {
      ...game,
      date: game.date.replaceAll("-", "/"),
      hour: parseInt(game.hour),

      userId: ownerData.userID,
      userFullName: ownerData.fullName,
    };
    //medhat
    if (ownerData.role == "FieldOwner") {
      gamee.price = "0"
    }
    setGame(gamee);

    let result = Joi.validate(game, gameSchema, { abortEarly: false });

    console.log(game);
    if (result.error == null) {
      // await axios
      //   .post(`/games/add`, gamee)
      //   .catch((e) => {
      //     console.log(e);
      //   });
      // console.log(gamee)
      // if (ownerData.role == "Player") {
      //   navigate("/player-profile");
      // } else navigate("/owner-profile");
      const secret = "secret-Arena-Very-6767";
      const jwt = sign(gamee, secret);
      console.log(gamee)
      localStorage.setItem("game", jwt)
      console.log(gamee)
      if (ownerData.role == "Player") {
        navigate(`/payment/`);
      } else {
        await axios
          .post(`/games/add`, gamee)
          .catch((e) => {
            console.log(e);

          })
        navigate(`/field-reservations/${gamee.fieldId}`);
      }
    } else {
      setShowError(true);
    }
  }
  function formInputHandler(e) {
    const { name, value } = e.target;

    let myGame = { ...game };
    myGame[name] = value;
    myGame?.date.replace("-", "/");
    myGame.userId = ownerData.userID;
    myGame.date.replace("-", "/");

    setGame(myGame);
  }

  useEffect(() => {
    setAvailableHours((old) =>
      old.filter((el) => {
        if (reservedHours) {
          return reservedHours.indexOf(el) < 0;
        } else return old;
      })
    );
  }, [reservedHours]);
  let date = new Date();

  var month2 =
    date.getMonth() + 2 < 10
      ? "0" + (date.getMonth() + 2)
      : date.getMonth() + 2;

  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var currentDate = `${date.getFullYear()}-${month}-${day}`;

  var maxDate = `${date.getFullYear()}-${month2}-${day}`;

  return (
    <div className={style.card} style={{ borderRadius: "15px" }}>

      <div className={style.Cardbody}>
        <div className="w-100  mx-auto  p-3">
          <h1 className="texttik m-4 d-flex justify-content-center text-center">
            {t("Game Details")}
          </h1>

          <form method="post" onSubmit={formSubmit}>
            <div className={style.datee}>
              <div className="form-group row">
                <label htmlFor="date" className="col-3 mt-1 h5">
                  {t("Date")}
                </label>

                <div className="col-lg-9 col-12">
                  <input
                    type="date"
                    min={currentDate}
                    max={maxDate}
                    onChange={formInputHandler}
                    className="form-control"
                    name="date"
                    id="date"></input>
                </div>
              </div>
            </div>
            <div className={style.datee}>
              <div className="form-group row mt-2">
                <label htmlFor="hour" className="col-3 mt-1 h5">
                  {t("Hours")}
                </label>

                <div className="col-12 col-lg-9 " onChange={formInputHandler}>
                  <select name="hour" id="hour" className=" form-control">
                    <option value="-" disabled>
                      {t("Choose hour")}
                    </option>
                    {availableHours.map((e, index) => (
                      <option key={index} value={parseInt(e)}>
                        {e < 12
                          ? `${e}-${e + 1} AM`
                          : `${e - 12}-${e + 1 - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center m-3">
              {showError && (
                <div className="text-center text-danger pb-3">
                  {t("Please enter all fields!")}
                </div>
              )}
              <input
                className="btn btn-outline-success"
                type="submit"
                value={ownerData.role == "FieldOwner" ? t("Disable Hour") : t("Reserve")}
                onClick={formSubmit}
              />
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ReservationForm;
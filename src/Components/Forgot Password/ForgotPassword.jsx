import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
const ForgotPassword = () => {
  const [t, i18n] = useTranslation();
  let [user, setUser] = useState({
    email: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  function inputHandler(e) {
    // if (e.target.value.includes("@")) {
    //   setUser({ email: "", password: "" });
    //   let myUser = { ...user };
    //   myUser[e.target.name] = e.target.value;
    //   let userWithEmail = {
    //     email: myUser.userName,
    //   };
    //   setUser(userWithEmail);
    // } else {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(e.target.value);
    console.log(user)
    // }
  }

  async function formSubmit(e) {
    e.preventDefault();
    console.log(user);
    await axios.post(
      `/users/sendEmailToChangePassword/${user}`,
      user
    );
    setShowMessage(true);
  }
  return (
    <div>
      <>
        <div className="w-50 mx-auto ">
          <h1 className="texttik m-4 d-flex justify-content-center">
            {t("Enter Your Email")}
          </h1>

          <form onSubmit={formSubmit}>
            <input
              placeholder={t("Email")}
              onChange={inputHandler}
              type="text"
              name="userName"
              className="text-center form-control m-2"
            />

            {showMessage && (
              <div className="text-center text-danger pt-3">
                <b>{t("Please Check Your Email!")}</b>
              </div>
            )}

            <div className="d-flex justify-content-center m-5">
              <button className="btn btn-outline-success col-lg-3 col-6">
                {t("Send Email")}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default ForgotPassword;

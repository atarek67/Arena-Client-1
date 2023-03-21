import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
const ResetPassword = () => {
  const [t, i18n] = useTranslation();
  let [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // function inputHandler(e) {
  //   if (e.target.value.includes("@")) {
  //     setUser({ email: "", password: "" });
  //     let myUser = { ...user };
  //     myUser[e.target.name] = e.target.value;
  //     let userWithEmail = { email: myUser.userName, password: myUser.password };
  //     setUser(userWithEmail);
  //   } else {
  //     let myUser = { ...user };
  //     myUser[e.target.name] = e.target.value;
  //     setUser(myUser);
  //   }
  // }
  function inputHandler(e) {

    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(user);
  }
  async function formSubmit(e) {
    e.preventDefault();
    await axios.patch(
      `/users/resetPassword/${user.email}`,
      { password: user.password }
    ).catch((e) => console.log(e));
    navigate("/login");
  }

  return (
    <div>
      <>
        <div className="w-50 mx-auto ">
          <h1 className="texttik m-4 d-flex justify-content-center">
            {t("Reset Your Password")}
          </h1>

          <form onSubmit={formSubmit}>
            <input
              placeholder="Email / Username"
              onChange={inputHandler}
              type="text"
              name="userName"
              className="text-center form-control m-2"
              pattern="^([a-zA-Z0-9]{3,20})$|^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter  valid Username or Email"
            />
            <input
              placeholder="New Password"
              onChange={inputHandler}
              type="password"
              name="password"
              className="text-center form-control m-2"
              pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
              title="Match the password format (Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character)"
            />
            {showError && (
              <div className="text-center text-danger pt-3">
                <b>{t("Please Enter Correct Email/Username")}</b>
              </div>
            )}

            <div className="d-flex justify-content-center m-5">
              <button className="btn btn-outline-success col-lg-3 col-6">
                {t("Reset")}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default ResetPassword;

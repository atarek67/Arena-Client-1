import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
export default function Login(props) {
  const [t, i18n] = useTranslation();
  let [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getUser(e) {
    if (e.target.value.includes("@")) {
      if (e.target.type != "password") {
        setUser({ email: "", password: "" });

        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        let userWithEmail = {
          email: myUser.userName,
          password: myUser.password,
        };
        setUser(userWithEmail);
      } else {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
      }
    } else {
      let myUser = { ...user };
      myUser[e.target.name] = e.target.value;
      setUser(myUser);
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let { data, error, body } = await axios
      .post(`/users/login`, user)
      .catch((err) => {
        setShowError(true);
         setIsLoading(false);
      });

    if (data.message === "Logged In Successfully") {
      localStorage.setItem("userToken", data.token);
      // getLoginUser()
      let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
      let userData = jwtDecode(encodedToken);
      dispatch({ type: "setLoggedInUser", payload: userData });
      /*When the user Logged in successfully call the function getLoginUser();
      To decode the token and save it in the useState*/
      setIsLoading(false);
      if (userData.role == "Admin") {
        setIsLoading(false);

        navigate("/admin");
      } else navigate("/");
    } else if (data.message !== "Logged In Successfully") {
      setIsLoading(false);

      alert("User Not Found or password and Email is wrong");
    }
  }

  return (
    <>
      <div className="w-50 mx-auto ">
        <h1 className="texttik m-4 d-flex justify-content-center">
          {t("Login")}
        </h1>

        <form onSubmit={formSubmit}>
          <input
            placeholder={t("Email / Username")}
            onChange={getUser}
            type="text"
            name="userName"
            className="text-center form-control m-2"
          />
          <input
            placeholder={t("Password")}
            onChange={getUser}
            type="password"
            name="password"
            className="text-center form-control m-2"
          />
          {showError && (
            <div className="text-center text-danger pt-3">
              <b>{t("Wrong Information or not confirmed email")}</b>
            </div>
          )}
          <Link to="/forgot-password" className="text-danger">
            {t("Forgot your password?")}
          </Link>

          <div className="d-flex justify-content-center m-5">
            <button className="btn btn-outline-success col-9 col-lg-3 ">
              {isLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                t("Login")
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

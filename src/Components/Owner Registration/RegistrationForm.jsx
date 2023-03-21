import React from "react";
import "./ValidatedForm";
import { useState } from "react";
import style from "./registration.module.css";
import { useTranslation } from 'react-i18next';

const RegistrationForm = ({
  error,
  showVerify,
  validateProperty,
  validateForm,
  setError,
  user,
  setUser,
  formSubmit,
  fieldIsEmpty,
  alreadyTaken,
  isLoading
}) => {
  let [inputIsTouched, setInputIsTouched] = useState(false);

  const onBlurHandler = (e) => {
    Object.keys(error).length === 0
      ? setInputIsTouched(false)
      : setInputIsTouched(true);
  };

  const handleSave = (e) => {
    const { name, value } = e.target;
    let errorData = { ...error };
    const errorMessage = validateProperty(e);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let myUser = { ...user };
    myUser[name] = value;
    setUser(myUser);

    setError(errorData);
  };
  const [t, i18n] = useTranslation();

  return (
    <div id="reg" className={style.bodyReg}>
      <div className="d-flex align-items-center gradient-custom-4 pt-2 pb-1">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h1 className="texttik m-4 d-flex justify-content-center">
                    {t("Register")}
                  </h1>

                  <form
                    method="post"
                    onSubmit={formSubmit}
                    className="justify-content-center rounded"
                  >
                    <div className="form-group row mt-2 mb-4">
                      <label
                        htmlFor="full-name"
                        className="col-sm-3 col-form-label fs-5"
                      >
                        {t("Full Name")}
                      </label>
                      <div className="col-sm-9 ">
                        <input
                          type="text"
                          onChange={handleSave}
                          onBlur={onBlurHandler}
                          className="form-control"
                          name="fullName"
                          value={user.fullName}
                          id="full-name"
                          placeholder={t("Full Name")}
                        />
                      </div>
                      {error.fullName && inputIsTouched && (
                        <div className="text-danger text-center   ">
                          {/* {Tarek} */}
                          {t("Full Name must be characters")}
                        </div>
                      )}
                    </div>

                    <div className="form-group row  mb-4">
                      <label
                        htmlFor="userName"
                        className="col-sm-3 col-form-label fs-5 "
                      >
                        {t("username")}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          onBlur={onBlurHandler}
                          onChange={handleSave}
                          className="form-control"
                          name="userName"
                          value={user.userName}
                          id="userName"
                          placeholder={t("Username")}
                          // title="Pleae enter a valid username format"

                        />
                      </div>
                      {error.userName && inputIsTouched && (
                        <div className="text-danger text-center ">
                          {t("length must be at least 3 characters long and no spaces")}
                        </div>
                      )}
                    </div>

                    <div className="form-group row mb-4">
                      <label
                        htmlFor="phone"
                        className="col-sm-3 col-form-label fs-5"
                      >
                        {t("Phone")}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          onBlur={onBlurHandler}
                          onChange={handleSave}
                          className="form-control"
                          name="phone"
                          value={user.phone}
                          id="phone"
                          placeholder={t("Phone")}
                        />
                      </div>
                      {error.phone && inputIsTouched && (
                        <div className="text-danger text-center ">
                          {t("You should enter a valid phone number")}
                        </div>
                      )}
                    </div>

                    <div className="form-group row mb-4 ">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label fs-5"
                      >
                        {t("Email")}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          onBlur={onBlurHandler}
                          onChange={handleSave}
                          className="form-control"
                          name="email"
                          value={user.email}
                          id="email"
                          placeholder={t("Email")}
                        />
                      </div>
                      {error.email && inputIsTouched && (
                        <div className="text-danger text-center ">
                          {t("email must be a valid email")}
                        </div>
                      )}
                    </div>

                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-3 col-form-label fs-5"
                      >
                        {t("Password")}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="password"
                          autoComplete="on"
                          onBlur={onBlurHandler}
                          onChange={handleSave}
                          className="form-control"
                          name="password"
                          id="inputPassword"
                          placeholder={t("Password")}
                        />
                      </div>
                      {error.password && inputIsTouched && (
                        <div className="text-danger text-center ">
                          {/* {error.password} */}
                          {t("Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character")}
                        </div>
                      )}
                    </div>

                    {fieldIsEmpty && inputIsTouched && (
                      <div className="text-center text-danger mt-3">
                        {t("Please enter all fields!")}
                      </div>
                    )}
                    {alreadyTaken && (
                      <div className="text-center text-danger">
                        {t("username or email already taken")}
                      </div>
                    )}
                    <div className="m-4 d-flex justify-content-center ">
                     <button className="btn btn-outline-success col-6 col-lg-3 " type="submit" onClick={validateForm}>
                      {isLoading ? (
                        <div className="spinner-border" role="status"></div>
                      ) : (
                        t("Register")
                      )}
                    </button>
                    </div>
                    {showVerify && <><div className="bg-warning text-center p-1 h5 rounded-pill">{t("Please Check Your Email for Verification")}</div></>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

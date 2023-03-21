import React from "react";
import "./ValidatedForm";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const RegistrationForm = ({
  error,
  validateProperty,
  showVerify,
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
    // col-12 col-md-9 col-lg-7 col-xl-6
    <div className="d-flex align-items-center gradient-custom-4 pt-2 pb-1 ">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-75">
          <div className="col-12 col-md-9 col-lg-6 col-xl-6 ">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">{t("Create an account")}</h2>



                <form
                  method="post"
                  onSubmit={formSubmit}
                  className="justify-content-center rounded">
                  <div className="form-group  row mt-2 mb-4">
                    <label htmlFor="full-name" className="col-sm-3 col-form-label fs-5">
                      {t("Full Name")}
                    </label>
                    <div className="col-sm-9 ">
                      {/* Tarek */}
                      <input
                        type="text"
                        onChange={handleSave}
                        onBlur={onBlurHandler}
                        className="form-control"
                        name="fullName"
                        value={user.fullName}
                        id="full-name"
                        placeholder="ex: Ahmed Tarek"
                      />
                    </div>
                    {error.fullName && inputIsTouched && (
                      // <div className="text-danger text-center mx-lg-5 mx-1">{error.fullName}</div>
                      <div className="text-danger text-center mx-lg-5 mx-1">{t("Full Name must be characters")}</div>
                    )}
                  </div>

                  <div className="form-group row  mb-4">
                    <label htmlFor="userName" className="col-sm-3 col-form-label fs-5 ">
                      {t("Username")}
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
                      />
                    </div>
                    {error.userName && inputIsTouched && (
                      <div className="text-danger text-center mx-lg-5 mx-1">{t("length must be at least 3 characters long and no spaces")}</div>
                    )}
                  </div>

                  <div className="form-group row   mb-4 ">
                    <label htmlFor="birthDate" className="col-sm-3 col-form-label fs-5">
                      {t("Date of birth")}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        onBlur={onBlurHandler}
                        value={user.birthDate}
                        id="birthDate"
                        onChange={handleSave}
                      />
                    </div>
                    {error.birthDate && inputIsTouched && (
                      <div className="text-danger text-center mx-lg-5 mx-1">{error.birthDate}</div>
                    )}
                  </div>

                  <div className="form-group row mb-4">
                    <label htmlFor="location" className="col-sm-3 col-form-label fs-5">
                      {t("Loaction")}
                    </label>
                    <div
                      className="col-sm-9"
                      value={user.location}
                      onBlur={onBlurHandler}
                      onChange={handleSave}>
                      <select name="location" id="location" className=" form-control">
                        <optgroup label="New Cairo">
                          <option value="first">First Settlement</option>
                          <option value="fifth">Fifth Settlement</option>
                        </optgroup>
                        <optgroup label="Nasr City">
                          <option value="makram">Makram Ebeed</option>
                          <option value="mostafa">Mostafa el Nahas</option>
                        </optgroup>
                      </select>
                    </div>
                    {error.location && inputIsTouched && (
                      <div className="text-danger text-center mx-lg-5 mx-1">{error.location}</div>
                    )}
                  </div>

                  <div className="form-group row mb-4">
                    <label htmlFor="phone" className="col-sm-3 col-form-label fs-5">
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
                        placeholder="01000000000"
                      />
                    </div>
                    {error.phone && inputIsTouched && (
                      <div className="text-danger text-center mx-lg-5 mx-1">
                        {t("You should enter a valid phone number")}
                      </div>
                    )}
                  </div>

                  <div className="form-group row mb-4 ">
                    <label htmlFor="email" className="col-sm-3 col-form-label fs-5">
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
                        placeholder="ex: example@example.com"
                      />
                    </div>
                    {error.email && inputIsTouched && (
                      <div className="text-danger text-center mx-lg-5 mx-1">{error.email}</div>
                    )}
                  </div>

                  <div className="form-group row mb-4">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label fs-5">
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
                      // <div className="text-danger text-center ">{error.password}</div>
                      <div className=" text-center text-danger mx-lg-5 mx-1">
                        {t(" Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character")}
                      </div>
                    )}
                  </div>

                  {fieldIsEmpty && (
                    <div className="text-center text-danger">
                      {t("Please enter all fields!")}
                    </div>
                  )}
                  {alreadyTaken && (
                    <div className="text-center text-danger">
                      {t("username or email  already taken!")}
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
    // </section>

  );
};

export default RegistrationForm;

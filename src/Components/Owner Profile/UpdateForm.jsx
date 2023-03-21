import Joi from "joi-browser";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import sign from 'jwt-encode';
import axios from "axios";
import { useTranslation } from 'react-i18next';

const UpdateForm = ({ setUpdateFormIsVisible }) => {
  const [t, i18n] = useTranslation();

  //TODO need to send the fieldOwner ID
  let OwnerToken = localStorage.getItem("userToken");
  let ownerData = jwtDecode(OwnerToken);

  let [user, setUser] = useState({
    email: ownerData.email,
    fullName: ownerData.fullName,
    phone: ownerData.phone,
    userName: ownerData.userName,
    image: ownerData.image
  });

  const [showError, setShowError] = useState(false);
  let userSchema = {
    fullName: Joi.string().min(3).max(20).required(),
    userName: Joi.string().min(5).max(15).required(),
    phone: Joi.string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
      .required(),
    image: Joi
  };

  async function formSubmit(e) {
    e.preventDefault();

    let result = Joi.validate(user, userSchema, { abortEarly: false });
    if (result.error === null) {
      //TODO check url
      await axios.patch(`/fieldOwners/update/${ownerData.userID}`, user);
      alert("Updated succussfully");

      let myUser = user;

      myUser.role = "fieldOwner";
      myUser.status = "Active";
      myUser.userID = ownerData.userID;

      const secret = 'secret-Arena-Very-6767';
      const jwt = sign(myUser, secret);


      localStorage.setItem("userToken", jwt);
      window.location.reload();

      setUpdateFormIsVisible(false);
    } else setShowError(true);

  }

  function formInputHandler(e) {
    const { name, value } = e.target;
    let myUser = { ...user };
    myUser[name] = value;
    setUser(myUser);
  }

  return (
    <div>
      <div className="w-100  mx-auto  p-3">
        <h1 className="texttik m-4 d-flex justify-content-center ">{t("Update")}</h1>

        <form method="post" onSubmit={formSubmit}>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              {t("Email")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                value={user.email}
                disabled
                onChange={formInputHandler}
                className="form-control"
                name="email"
                id="email"
                placeholder="Field Name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              {t("Full Name")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                value={user.fullName}
                onChange={formInputHandler}
                className="form-control"
                name="fullName"
                id="fullName"
                pattern="^[a-zA-Z+?\s]{3,25}$"
                title="Please make sure that the Full Name have min (3) and max (25)"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="userName" className="col-sm-2 col-form-label">
              {t("Username")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                value={user.userName}
                disabled
                onChange={formInputHandler}
                className="form-control"
                name="userName"
                id="userName"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              {t("Phone")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                value={user.phone}
                onChange={formInputHandler}
                className="form-control"
                name="phone"
                id="phone"
                pattern="^01[0-2,5]{1}[0-9]{8}$"
                title="Please enter a valid phone number ex: 01000000000"
              />
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
              value={t("Confirm")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

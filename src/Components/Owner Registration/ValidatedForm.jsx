import React from "react";
import Joi from "joi-browser";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import axios from "axios";
const RegistrationValidation = () => {
  let [user, setUser] = useState({
    fullName: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState({});
  const [showVerify, setshowVerify] = useState(false);
  let [fieldIsEmpty, setFieldIsEmpty] = useState(false);
  const [alreadyTaken, setAlreadyTaken] = useState(false);
  let schema = {
    // Tarek
    fullName: Joi.string().min(3).max(25).required().regex(/^[a-zA-Z+?\s]{3,25}$/),
    userName: Joi.string().min(3).max(25).required().regex(/^[a-zA-Z0-9]{3,25}$/),
    phone: Joi.string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
      .required(),
    password: Joi.string().min(8).required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  };
  var response;
  async function formSubmit() {
    response = await axios.post(`/fieldOwners/add`, user).catch((e) => {
      console.log(e.response.data);
      console.log("aystring");
      if (e.response.data == "username or email already taken") {
        setAlreadyTaken(true);

      }
    })
    if (response.data) {
      setshowVerify(true);
      setAlreadyTaken(false);
      setFieldIsEmpty(false);
    }
  }

  let validateForm = (e) => {
    e.preventDefault();
    let result = Joi.validate(user, schema, { abortEarly: false });
    const { error } = result;
    if (!error) {
      formSubmit();
    } else {
      setFieldIsEmpty(true);
      const errorData = {};
      for (let users of error.details) {
        const name = users.path[0];
        const message = users.message;
        errorData[name] = message;
      }

      setError(errorData);
      return errorData;
    }
  };
  const validateProperty = (e) => {
    const { name, value } = e.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;

    return error ? error.details[0].message : null;
  };


  return (
    <RegistrationForm
      showVerify={showVerify}
      error={error}
      validateProperty={validateProperty}
      validateForm={validateForm}
      setError={setError}
      user={user}
      setUser={setUser}
      formSubmit={formSubmit}
      fieldIsEmpty={fieldIsEmpty}
      alreadyTaken={alreadyTaken}
    />
  );
};

export default RegistrationValidation;

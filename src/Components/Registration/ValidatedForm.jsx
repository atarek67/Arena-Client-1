import React from "react";
import Joi from "joi-browser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import axios from "axios";
const RegistrationValidation = () => {
  let [user, setUser] = useState({
    fullName: "",
    userName: "",
    phone: "",
    birthDate: "",
    location: "first",
    email: "",
    password: "",
    role: "player",
  });
  let [error, setError] = useState({});
  let [fieldIsEmpty, setFieldIsEmpty] = useState(false)
  const [showVerify, setshowVerify] = useState(false);
  const [alreadyTaken, setAlreadyTaken] = useState(false);
  const [isLoading,setIsLoading]=useState(false);

  const navigate = useNavigate();
  //Tarek
  let schema = {
    fullName: Joi.string().min(3).max(25).required().regex(/^[a-zA-Z+?\s]{3,25}$/)
      .options({
        language: {
          any: { required: 'is required' },
          string: { min: 'must be at least 3 Characters' },
          string: { max: 'must be MAX 25 Characters' },
        },
      }),

    userName: Joi.string().min(3).max(15).required().regex(/^[a-zA-Z0-9]{3,25}$/)
      .options({
        language: {
          any: { required: "username should be valid" }
        }
      }),
    phone: Joi.string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/)
      .required(),

    birthDate: Joi.date().required(),
    location: Joi.required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
      .required(),
    password: Joi.string().min(8).required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    role: Joi.string().required(),
  };
  var response;
  async function formSubmit(e) {

    response = await axios.post(`/players/add`, user).catch((e) => {
      console.log(e.response.data);
      console.log("aystring");
      if (e.response.data == "username or email already taken") {
        setAlreadyTaken(true);
        setIsLoading(false);
      }
    })
    if (response.data) {
      setIsLoading(false);
      setshowVerify(true);
      setAlreadyTaken(false);
      setFieldIsEmpty(false)
    }
    setIsLoading(false);
  }
  console.log(response);


  let validateForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let result = Joi.validate(user, schema, { abortEarly: false });
    const { error } = result;
    if (!error) {
      formSubmit();
    } else {
      setFieldIsEmpty(true)
      const errorData = {};
      for (let users of error.details) {
        const name = users.path[0];
        const message = users.message;
        errorData[name] = message;
        setIsLoading(false);
      }
setIsLoading(false);
      setError(errorData);
      console.log(errorData);
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
    <div className="">

      <RegistrationForm

        error={error}
        showVerify={showVerify}
        validateProperty={validateProperty}
        validateForm={validateForm}
        setError={setError}
        user={user}
        setUser={setUser}
        formSubmit={formSubmit}
        fieldIsEmpty={fieldIsEmpty}
        alreadyTaken={alreadyTaken}
isLoading={isLoading}
      />
    </div>
  );
};

export default RegistrationValidation;

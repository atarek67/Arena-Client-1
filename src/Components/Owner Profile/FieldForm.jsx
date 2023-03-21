import Joi from "joi-browser";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import {

  MDBCardImage,
} from "mdb-react-ui-kit";

const FieldForm = ({ setFormIsVisible }) => {
  const [t, i18n] = useTranslation();
  //TODO need to send the fieldOwner ID
  let OwnerToken = localStorage.getItem("userToken");
  let ownerData = jwtDecode(OwnerToken);

  const navigate = useNavigate()
  let [field, setField] = useState({
    fieldName: "",
    location: "newCairo",
    price: 0,
    valid: 0,
    locationOnMap: "",
    fieldOwnerFullName: ownerData.fullName,
    image: ["image1", "image2"],
    fieldOwnerId: ""
  });

  const [showError, setShowError] = useState(false);

  let fieldSchema = {
    fieldName: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.required(),
    valid: Joi.required(),
    fieldOwnerId: Joi.string().required(),
    fieldOwnerFullName: Joi.string().required(),
    locationOnMap: Joi.string(),
    image: Joi,
  };


  async function formSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < field.image.length; i++) {
      formData.append('image', field.image[i]);
    }
    formData.append('fieldName', field.fieldName);
    formData.append('locationOnMap', field.locationOnMap);
    formData.append('location', field.location);
    formData.append('price', field.price);
    formData.append('valid', "0");
    formData.append('fieldOwnerId', ownerData.userID);
    formData.append('fieldOwnerFullName', ownerData.fullName);


    let result = Joi.validate(field, fieldSchema, { abortEarly: false });
    console.log(field);
    if (result.error == null) {
      //TODO check url
      console.log(formData)
      await axios.post(`/fields/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      alert("Added succussfully")
      navigate("/my-fields")
      setFormIsVisible(false);
    } else setShowError(true);


  }

  function formInputHandler(e) {
    const { name, value } = e.target;

    let myField = { ...field };
    myField[name] = value;
    myField.fieldOwnerId = ownerData.userID
    setField(myField);

  }
  function imageHandler(e) {

    setField({ ...field, [e.target.name]: e.target.files });

  }

  return (
    <div>
      <div className="w-100  mx-auto  p-3">
        <h1 className="texttik m-4 d-flex justify-content-center ">
          {t("Field Details")}
        </h1>

        <form method="post" onSubmit={formSubmit}>
          <div className="form-group row mt-2">
            <label htmlFor="fieldName" className="col-sm-2 col-form-label">
              {t("Field Name")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                onChange={formInputHandler}
                className="form-control"
                name="fieldName"
                id="fieldName"
                placeholder={t("Field Name")}
                pattern="^[a-zA-Z+?\s]{3,25}$"
                title="Please make sure that the Field Name is a string and min (3) and max (25)"
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="locationOnMap" className="col-sm-2 col-form-label">
              {t("Maps")}
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                onChange={formInputHandler}
                className="form-control"
                name="locationOnMap"
                id="locationOnMap"
                placeholder={t("Your Field Location on Google Maps Link")}
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="location" className="col-sm-2 col-form-label">
              {t("Location")}
            </label>
            <div className="col-sm-10" value={field.location}>
              <select
                name="location"
                id="location"
                className=" form-control"
                onChange={formInputHandler}
              >
                <option value="New Cairo">New Cairo</option>
                <option value="Nasr City">Nasr City</option>
                <option value="Giza">Giza</option>
                <option value="Sayda Eesha">Sayda Eisha</option>
                <option value="Sayda Nefesa">Sayda Nefesa</option>
                <option value="Hdadayk El Koba">Hadayk el Koba</option>
                <option value="Sheraton">Sheraton</option>
                <option value="Masr El Gededa">Masr el Gededa</option>
                <option value="Shekh Zayed">Shekh Zayed</option>
                <option value="Ramses">Ramses</option>
                <option value="Korba">Korba</option>
                <option value="New Capital City">New Capital City</option>
              </select>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="price" className="col-sm-2 col-form-label">
              {t("Price")}
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                placeholder="Price"
                onChange={formInputHandler}
              />
            </div>
          </div>

          <div className="form-group mt-2 text-center">
            <label htmlFor="image" className="btn bg-light ">
              {t("Add Image")}
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                id="image"
                className=""
                style={{ visibility: "hidden" }}
                name="image"
                multiple
                onChange={imageHandler}
                required
              />
            </div>
          </div>
          <div className="text-center m-3">
            <div className="text-center text-danger pb-3">
              {showError && t("Please enter all fields!")}
            </div>

            <input
              className="btn btn-outline-success"
              type="submit"
              value={t("Add Field")}


            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldForm;

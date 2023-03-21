// Medhat
import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import Carousel from "react-bootstrap/Carousel";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const UpdateFieldForm = ({ fieldToUpdate, setShowUpdateForm, setFieldToUpdate, setCounterToUpdate }) => {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  const [t, i18n] = useTranslation();

  let OwnerToken = localStorage.getItem("userToken");
  let ownerData = jwtDecode(OwnerToken);
  const [fieldId, setFieldId] = useState()
  useEffect(() => {

    setFieldId(fieldToUpdate._id);

  }, [])

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
    let result = Joi.validate(fieldToUpdate, fieldSchema, { abortEarly: false });
    if (result.error == null) {
      //TODO check url

      await axios.patch(`/fields/update/${fieldId}
`, fieldToUpdate);
      alert("Added succussfully");
      //  navigate("/my-fields");
      setCounterToUpdate((old) => old + 1)
      setShowUpdateForm(false);
    } else {

      setShowError(true);
    }

  }

  function formInputHandler(e) {
    const { name, value } = e.target;


    let myField = { ...fieldToUpdate };
    myField[name] = value;
    myField.fieldOwnerId = ownerData.userID;
    myField = { fieldName: myField.fieldName, location: myField.location, price: myField.price, locationOnMap: myField.locationOnMap, fieldOwnerFullName: myField.fieldOwnerFullName, fieldOwnerId: myField.fieldOwnerId, valid: "0", image: myField.image }
    setFieldToUpdate(myField);
  }
  /////////////////////////////////
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  ///////////del/////////////

  const deleteImage = async (_id, i) => {
    await axios.delete(`/fields/deleteFieldImage/${_id}/${i}`).then(alert("deleted ya 3m"))
    window.location.reload();
  }
  ////////////Add/////////////
  const imageHandler = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('image', e.target.files[i]);
    }

    axios.post(`/fields/addFieldImages/${fieldId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((data) => {
    })
    window.location.reload();
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
                value={fieldToUpdate.fieldName}
                onChange={formInputHandler}
                className="form-control"
                name="fieldName"
                id="fieldName"
                placeholder="Field Name"
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
                value={fieldToUpdate.locationOnMap}
                placeholder={t("Your Field Location on Google Maps Link")}
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="location" className="col-sm-2 col-form-label">
              {t("location")}
            </label>
            <div className="col-sm-10" value={fieldToUpdate.location}>
              <select
                name="location"
                id="location"
                className=" form-control"
                onChange={formInputHandler}
              >
                <option value={fieldToUpdate.location}>
                  {fieldToUpdate.location}
                </option>

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
              {t("price")}
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                value={fieldToUpdate.price}
                onChange={formInputHandler}
              />
            </div>
          </div>


          <div
            className=" justify-content-end "
            style={{
              textAlign: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <label
              htmlFor="image"
              className="btn btn-success text-center mt-2"
              style={{
                position: "absolute",

                left: "50%",
                marginLeft: "-60px",
                width: "120px",
              }}>
              {t("Add Image")}
            </label>
            <input
              type="file"
              style={{
                visibility: "hidden",
              }}
              className=""
              id="image"
              name="image"
              multiple
              value={fieldToUpdate.image}
              onChange={imageHandler}
            />
          </div>
          <div className="col-lg-12 col-12 row justify-content-center mt-5">
            {fieldToUpdate.images?.map((i) => (
              <div className="col-lg-6 col-12 border border-dark p-3 ">
                <img
                  className="d-block w-100"
                  src={`${image}/${i}`}
                  alt="First slide"
                />
                <input
                  type="button"
                  value={t("delete")}
                  className="btn btn-outline-danger text-center col-12 mt-3 "
                  onClick={() => deleteImage(fieldToUpdate._id, i)}
                />
              </div>

            ))}


          </div>
          {/*  */}
          <div className="text-center m-3">
            <input
              className="btn btn-outline-success"
              type="submit"
              value={t("Update Field")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};


export default UpdateFieldForm;

import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import style from "./MyFields.module.css";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Modal from "./Modal";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import UpdateFieldForm from "./UpdateFieldForm";
import { useTranslation } from 'react-i18next';

export default function MyFields() {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";

  const [t, i18n] = useTranslation();

  let [fieldData, setFieldData] = useState([]);
  // medhat
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState();
  const [counterToUpdate, setCounterToUpdate] = useState();

  let OwnerToken = localStorage.getItem("userToken");
  let ownerData = jwtDecode(OwnerToken);

  useEffect(() => {
    async function getFieldsData() {
      let { data } = await axios.get(
        `/fields/fieldOwner/${ownerData.userID}`
      );
      console.log(data);
      setFieldData(data);
    }

    getFieldsData();
  }, [counterToUpdate]);
  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="10">
            <div className={style.Backbtn}>
              <Link to="/owner-profile">
                <input
                  className="btn btn-outline-success"
                  type="submit"
                  value={t("Back")}
                />
              </Link>
            </div>

            {/* medhat */}
            {showUpdateForm && (
              <Modal setShowUpdateForm={setShowUpdateForm}>
                <UpdateFieldForm
                  setShowUpdateForm={setShowUpdateForm}
                  setFieldToUpdate={setFieldToUpdate}
                  setCounterToUpdate={setCounterToUpdate}
                  fieldToUpdate={fieldToUpdate}></UpdateFieldForm>
              </Modal>
            )}
            {fieldData.length == 0 && (
              <h3 className="text-center text-dark mt-5">
                {t("No fields yet, please start adding your field!")}
              </h3>
            )}
            {fieldData.map((f, index) => (
              <div className="container" key={index}>
                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3 row">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                        <MDBCardImage
                          src={`${image}/${f.images[0]}`}
                          fluid
                          className="cardImageForField"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <h4>{t("Field Name")}: {f.fieldName}</h4>
                        <div className="mt-1 mb-0 text-muted small">
                          <h5>{t("Field Location")}: {f.location}</h5>
                          <span className="h5">
                            {" "}
                            <Rating
                              className=""
                              name="read-only"
                              value={parseInt(f.rate)}
                              readOnly
                            />
                          </span>
                          <a href={f.locationOnMap} target="_blank" className="text-success">
                            <h5 className="text-success">
                              <i
                                className="fa fa-map-marker text-success"
                                aria-hidden="true"></i>
                              {t(" Location on Maps ")}{" "}
                            </h5>
                          </a>
                        </div>
                      </MDBCol>
                      <MDBCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1 mx-5">
                            {t("Price")}: {f.price} {t("EGP")}
                          </h4>
                        </div>

                        <div className="d-flex flex-column mt-5">
                          {f.valid == 0 ? (
                            <h5 className="text-center text-danger">
                              {t("Pending to approve your request...")}
                            </h5>
                          ) : (
                            <div className="text-center">
                              <div>

                                <Link to={`/field-reservations/${f._id}`}>
                                  <input
                                    className="btn btn-outline-success col-9 mb-1"
                                    type="button"
                                    value={t("Show Reservations")}
                                  />
                                </Link>
                              </div>
                              {/* medhat */}

                              {/* medhat */}
                              <Link to={`/court-details/${f._id}`}>
                                <input
                                  className="btn btn-outline-success mb-1 col-9"
                                  type="button"
                                  value={t("Disable Hours")}
                                />
                              </Link>
                              <input
                                className="btn btn-outline-success col-9 mb-1"
                                type="button"
                                value={t("Update Field")}
                                onClick={() => {
                                  setShowUpdateForm(true);
                                  setFieldToUpdate(f);
                                }}
                              />
                          
                            </div>
                          )}
                          <div className="text-center">
                              <input
                                className="btn btn-outline-danger text-center col-9 mb-1"
                                type="button"
                                value={t("Delete Field")}
                                onClick={() => {

                                  async function deleteField() {
                                    let res = await axios.delete(
                                      `/fields/delete/${f._id}`
                                    );
                                    console.log(res)
                                  }

                                  if (
                                    window.confirm(
                                      "are you sure you want to delete this fields?"
                                    )
                                  ) {
                                    deleteField();
                                    setCounterToUpdate((old) => old + 1)
                                    window.alert("field deleted successfuly");
                                  }
                                }
                                }
                              />
</div>
                          {/* medhat */}
                          {/* Icon insetad of Button */}

                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export function myFieldLoader() {
  if (localStorage.getItem("userToken")) {
    var OwnerToken = localStorage.getItem("userToken");
    let ownerData = jwtDecode(OwnerToken);
    if (ownerData.role === "FieldOwner") {
      return null;
    } else return null;
  } else return redirect("/login");
}

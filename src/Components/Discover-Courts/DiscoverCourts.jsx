import React, { useEffect, useState } from "react";
import style from "./discoverCourts.module.css";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Rating } from "@mui/material";
import Modal from "../Owner Profile/Modal";
//medhat
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import FieldComments from "./FieldComments";
import { useTranslation } from 'react-i18next';

//TODO need to check if the field is validated by admin
export default function DiscoverCourts() {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  // const image = "/images/fieldPic/";
  // https://arena-server.onrender.com/images/fieldPic/

  const [t, i18n] = useTranslation();
  let fields = useLoaderData();
  console.log(fields);
  var OwnerToken = localStorage.getItem("userToken");
  if (OwnerToken) {
    var ownerData = jwtDecode(OwnerToken);
  }
  //medhat
  const [showComments, setShowComments] = useState(false);
  const [fieldId, setFieldId] = useState()
  const navigate = useNavigate();
  /////////////Search By Location/////////////////
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    if (searchInput !== "") {
      const filteredData = fields.filter(({ location }) => {
        return Object.values(location)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(fields);
    }
  }, [searchInput]);
  const searchItems = async (searchValue) => {
    const value = await searchValue;

    setSearchInput(value);
  };
  ////////Sort By Price//////////////////////
  const [Sort, setSort] = useState();

  const sortByPrice = () => {
    fields.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    setSort(fields);
  };
  ////////////////////////
  return (
    <div className={style.MDBContainer}>

      {/* <div className="container d-flex align-items-center justify-content-center"> */}
      <div className="container col-lg-4 d-flex justify-content-center align-items-center text-center d-flex p-2">
        <MDBContainer fluid>
          <MDBInputGroup
            tag="form"
            className="d-flex w-auto mb-3 justify-content-center ">
            <input
              className="form-control tikform text-center"
              placeholder={t("Search by location...")}
              aria-label="Search"
              type="search"
              onChange={(e) => searchItems(e.target.value)}
            />
            <div className="">
              <button type="button" onClick={sortByPrice} className="btn btn-outline-success h-100">
                {t("Sort Price Low to High")}
              </button>
            </div>
          </MDBInputGroup>
        </MDBContainer>
      </div>


      {/* </div> */}


      <MDBContainer className="my-5 ">
        {showComments && (
          <Modal setShowComments={setShowComments}>
            {/* medhat */}
            <FieldComments fieldId={fieldId}></FieldComments>
          </Modal>
        )}
        <MDBRow>
          {filteredResults.length == 0 && (
            <h3 className="text-danger text-center">{t("No fields found!")}</h3>
          )}
          {searchInput.length > 0
            ? filteredResults.map((f, index) => (
              // <div key={index}>
              <>
                {f.valid == "1" && (
                  <MDBCol md="12" key={index} lg="4" className="mb-4 mb-lg-0">
                    <MDBCard>
                      <div className="d-flex justify-content-center p-3">
                        <p className="lead mb-0"> {f.fieldName}</p>
                      </div>
                      <MDBCardImage
                        className="p-4 cardImage"
                        src={`${image}/${f.images[0]}`}
                        position="top"

                      />
                      <MDBCardBody>
                        <div className="d-flex justify-content-between text-center">
                          <p className="text-center">
                            {t("Field Location")}: {f.location}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>{t("Price")}: {f.price} {t("EG")} </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>
                            {t("Location on maps")}:{" "}
                            <a href={f.locationOnMap} target="_blank">
                              {t("Navigate me")}
                            </a>{" "}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <input
                            type="button"
                            value={t("Show Reviews")}
                            className="btn btn-outline-success"
                            onClick={() => {
                              setFieldId(f._id);
                              setShowComments(true);
                            }}
                          />
                          <div className="ms-auto text-warning">
                            <Rating
                              name="read-only"
                              value={parseInt(f.rate)}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="text-center pt-2">
                          {ownerData?.role == "FieldOwner" ? null : (
                            <button
                              onClick={() => {
                                if (localStorage.getItem("userToken")) {
                                  navigate(`/court-details/${f._id}`);
                                } else {
                                  navigate("/login");
                                }
                              }}
                              className="btn btn-outline-success ">
                              {t("Reserve Now")}
                            </button>
                          )}
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                )}
              </>
            ))
            : fields.map((f, index) => {
              return (
                <>
                  {f.valid == "1" && (
                    <MDBCol
                      md="12"
                      lg="4"
                      className="mb-4 mb-lg-0"
                      key={index}>
                      <MDBCard>
                        <div className="d-flex justify-content-center p-3">
                          <p className="lead mb-0"> {f.fieldName}</p>
                        </div>

                        <MDBCardImage
                          className="p-4 cardImage"
                          // src="https://www.weareimps.com/siteassets/club/3g-header.jpg/Large"
                          src={`${image}/${f.images[0]}`}
                          position="top"

                        />
                        <MDBCardBody>
                          <div className=" text-center">
                            <p className="text-center">{t("Field Location")}: {f.location.toUpperCase()}</p>
                          </div>
                          <div className=" justify-content-center">
                            <p className="text-center">{t("Price")}: {f.price} {t("EGP/HOUR")} </p>
                          </div>
                          <div className=" justify-content-between">
                            <p className="text-center">
                              {t("Location on maps")}:{" "}
                              <a className="text-center" href={f.locationOnMap} target="_blank">
                                {t("Navigate me")}
                              </a>{" "}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <input
                              type="button"
                              value={t("Show Reviews")}
                              className="btn btn-outline-success"
                              onClick={() => {
                                setFieldId(f._id);
                                setShowComments(true);
                              }}
                            />
                            <div className="ms-auto text-warning">
                              <Rating
                                name="read-only"
                                value={parseInt(f.rate)}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="text-center pt-2">
                            {ownerData?.role == "FieldOwner" ? null : (
                              <button
                                onClick={() => {
                                  if (localStorage.getItem("userToken")) {
                                    navigate(`/court-details/${f._id}`);
                                  } else {
                                    navigate("/login");
                                  }
                                }}
                                className="btn btn-success ">
                                {t("Reserve Now")}
                              </button>
                            )}
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  )}
                </>
              );
            })}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export async function discoverFieldsLoader() {
  let { data } = await axios.get(`/fields`);
  return data;
}

import React, { useState, useEffect } from "react";
import FieldForm from "./FieldForm";
import Modal from "./Modal";
import style from "./OwnerProfile.module.css";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
import UpdateForm from "./UpdateForm";

import sign from 'jwt-encode'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const OwnerProfile = () => {
  const [t, i18n] = useTranslation();
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false);
  const [userInfo, setuserInfo] = useState()
  const image = "https://arena-server.onrender.com/api/images/fieldOwnerPic/";

  function addField() {
    setFormIsVisible(true);
  }
  function updateProfile() {
    setUpdateFormIsVisible(true);
  }
  let OwnerToken = localStorage.getItem("userToken");
  let ownerData = jwtDecode(OwnerToken);


  useEffect(() => {
    async function getUserInfo() {

      let { data } = await axios.get(`/fieldOwners/${ownerData.userID}`);
      setuserInfo(data)

    }
    getUserInfo();
  }, [])
  //////////////
  function imageHandler(e) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0])

    axios.post(`/fieldOwners/updateFieldOwnerImage/${ownerData.userID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((data) => {
      console.log(data.data.image)
      userInfo.image = data.data.image;
      console.log(data)
    })
    let newUser = ownerData
    const secret = 'secret-Arena-Very-6767';
    const jwt = sign(newUser, secret);
    localStorage.setItem("userToken", jwt);
    window.location.reload();

  }



  return (
    <div className="container">
      <div className=" justify-content-center text-center">
        <div className="btn-group m-5  ">
          <Link to="/my-fields" className={style.btn}>
            <input
              className="btn btn-outline-success"
              type="submit"
              value={t("My fields")}
            />
          </Link>
          <Link>
            <input
              className="btn btn-outline-success"
              type="submit"
              value={t("Add Field")}
              onClick={addField}
            />
          </Link>
        </div>
      </div>
      <div>
        {formIsVisible && (
          <Modal setFormIsVisible={setFormIsVisible}>
            <FieldForm setFormIsVisible={setFormIsVisible}></FieldForm>
          </Modal>
        )}
        {updateFormIsVisible && (
          <Modal setUpdateFormIsVisible={setUpdateFormIsVisible}>
            <UpdateForm
              setUpdateFormIsVisible={setUpdateFormIsVisible}></UpdateForm>
          </Modal>
        )}
        <section className="text-center ">
          <MDBRow className="justify-content-between pb-3 pt-4"></MDBRow>
          <MDBContainer className="py-1">
            <MDBRow className="justify-content-between">
              <MDBCol sm="4" lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      src={`${image}/${userInfo?.image}`}
                      alt="avatar"
                      onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                        currentTarget.src ="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
                    }}
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />
                    {/* <form onSubmit={handelSubmit}> */}
                    <div className="pt-2 mx-1 ">
                      <label htmlFor="image" className="btn bg-light ">
                        {t("Change Image")}
                      </label>
                      <input
                        type="file"
                        id="image"
                        style={{ visibility: "hidden" }}
                        name="image"
                        onChange={imageHandler}
                      />
                      {/* <input
                       type="submit"
                       name="sumbit"
                    /> */}
                    </div>
                    {/* </form> */}
                    <br />
                    <p className="text-muted mb-1 pt-2">{userInfo?.role}</p>

                    <div className="d-flex justify-content-center mb-2"></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol sm="8" lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{t("Full Name")}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userInfo?.fullName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{t("Email")}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userInfo?.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{t("Phone")}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userInfo?.phone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{t("Username")}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userInfo?.userName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <input
                  className="btn btn-outline-success"
                  type="submit"
                  value={t("Update Profile")}
                  onClick={updateProfile}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  );
};

export default OwnerProfile;

export function routeProtectionLoader() {
  if (localStorage.getItem("userToken")) {
    return null;
  } else return redirect("/login");
}

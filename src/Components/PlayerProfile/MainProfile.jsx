import React, { useState } from 'react'
import sign from 'jwt-encode'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import jwtDecode from "jwt-decode";
import PlayerUpdateForm from './UpdateForm';
import Modal from '../Owner Profile/Modal';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function MainProfile() {
  const [t, i18n] = useTranslation();
  const image = "https://arena-server.onrender.com/api/images/playerPic/";
  let [PlayerUpdateFormIsVisible, setPlayerUpdateFormIsVisible] = useState(false)
  let playerToken = localStorage.getItem("userToken");
  let playerData = jwtDecode(playerToken);
  function updateProfile() {
    setPlayerUpdateFormIsVisible(true);
  }

  // const [formStateData, setStateFormData] = useState({});
  async function imageHandler(e) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0])
    //   console.log(formData)
    await axios.post(`/players/updatePlayerImage/${playerData.userID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((data) => {
      console.log(data.data.image)
      playerData.image = data.data.image;
      console.log(data)
    })
    let newUser = playerData
    const secret = 'secret-Arena-Very-6767';
    const jwt = sign(newUser, secret);
    localStorage.setItem("userToken", jwt);
    window.location.reload();

  }

  return (
    <div>
      <section className="text-center ">
        {PlayerUpdateFormIsVisible && (
          <Modal setPlayerUpdateFormIsVisible={setPlayerUpdateFormIsVisible}>
            <PlayerUpdateForm
              setPlayerUpdateFormIsVisible={setPlayerUpdateFormIsVisible}
            ></PlayerUpdateForm>
          </Modal>
        )}
        <MDBContainer className="py-1">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol sm="4" lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    src={`${image}/${playerData.image}`}
                    alt="avatar"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                        currentTarget.src ="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
                    }}
                    className="rounded-circle preview "
                    // style={{ width: "150px" }}
                    fluid
                  />
                  {/* <form onSubmit={handelSubmit}> */}
                  <div className="pt-2 ">
                    <label htmlFor="image" className="btn bg-light">
                      {t("Change Image")}
                    </label>
                    <input
                      type="file"
                      id="image"
                      style={{ visibility: "hidden" }}
                      name="image"
                      onChange={imageHandler}
                    />
                    {/* <input type="submit" name="sumbit" /> */}
                  </div>
                  {/* </form> */}
                  {playerData ? (
                    <>
                      <p className="text-muted mt-1">{playerData.role}</p>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="d-flex justify-content-center"></div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="8" lg="8">
              <MDBCard className="mt-3">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>{t("Full Name")}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {playerData.fullName}
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
                        {playerData.email}
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
                        {playerData.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>{t("Date Of Birth")}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {playerData.birthDate}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>{t("Username")}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted mb-3">
                        {playerData.userName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <input
                className="btn btn-outline-success mt-1"
                type="submit"
                value={t("Update Profile")}
                onClick={updateProfile}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

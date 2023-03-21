import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function LastGames() {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  // console.log(image)
  const [myGames, setMyGames] = useState([]);
  const [fields, setFields] = useState([]);

  //medhat
  const [updateCounter, setUpdateCouter] = useState(0);
  const [showComment, setShowComment] = useState(false);

  //medhat
  const [comment, setComment] = useState("");

  function renderComment(game) {
    return (
      <>
        <textarea
          name="comment"
          id="comment"
          cols="50"
          rows="2"
          className=" m-2"
          placeholder="Comment"
          defaultValue={game.comment}
          onChange={(e) => setComment(e.target.value)}></textarea>
        <div className="text-center">
          <button
            className="btn btn-outline-dark text-center m-2"
            onClick={(e) => {

              //medhat
              async function updateComment() {
                await axios.patch(
                  `/games/update/${game._id}`,
                  {
                    comment: comment,
                  }
                );
                // console.log(rating)
              }
              updateComment();
              setUpdateCouter((old) => old + 1);
            }}>
            Add Comment
          </button>
        </div>
      </>
    );
  }

  let playerToken = localStorage.getItem("userToken");
  let playerData = jwtDecode(playerToken);

  useEffect(() => {
    async function getGames() {
      let { data } = await axios.get(`/fields`);
      setFields(data);
    }
    getGames();
  }, []);

  async function handleComment(e) {
    let x = myGames[0];
    console.log("------------");
    console.log(x);
    console.log("------------");

    console.log("Gwa el patch ****");
    console.log(myGames[0]._id);

    console.log("Gwa el patch ****");
    await axios
      .patch(`/games/update/${myGames[0]._id}`, {
        comment: "Here Is an update in axios patch aaaa",
      })
      .catch((e) => {
        console.log("***********Error********");
        console.log(e);
        console.log("***********Error********");
      });
    console.log("Patch");
  }

  useEffect(() => {
    async function getGames() {
      //TODO change url with this url to get finished games only
      let { data } = await axios
        .get(
          `/games/user/previousGames/${playerData.userID}`
        )
        .catch((e) => {
          console.log(e);
        });
      setMyGames(data);
    }
    getGames();
  }, [updateCounter]);
  console.log(myGames)
  const [t, i18n] = useTranslation();
  // console.log(myGames.fieldImages)
  return (
    <div>
      <MDBContainer className="my-5 ">
        <MDBRow>
          {myGames?.length === 0 && (
            <div className="text-center  ">
              <h3>{t("You don't have previous games yet...")}</h3>
            </div>
          )}
          {myGames?.map((game, index) => (
            <MDBCol key={index} md="12" lg="4" className="mb-4 mb-lg-0">
              <MDBCard>
                <div className="d-flex justify-content-center p-3">
                  <p className="lead mb-0">
                    {fields?.find((field) => field._id === game.fieldId)
                      ? fields?.find((field) => field._id === game.fieldId)
                        .fieldName
                      : null}
                  </p>
                </div>
                {game.fieldImages ? <>
                  <MDBCardImage
                    className="p-4 img-fluid cardImage"
                    src={`${image}/${game?.fieldImages[0]}`}
                    position="top"

                  />
                </> : <><span>No image here</span></>}

                <MDBCardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">{t("Price")}</h5>
                    <h5 className="text-dark mb-0">
                      {" "}
                      {fields?.find((field) => field._id === game.fieldId)
                        ? fields?.find((field) => field._id === game.fieldId)
                          .price + t("EGP")
                        : null}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      {t("From")}: <span className="fw-bold">{game.date}</span>
                    </p>
                    <br />

                    <div className="ms-auto">
                      <Rating
                        name="simple-controlled"
                        style={{ maxWidth: 180 }}
                        //medhat
                        value={parseInt(game.rate)}
                        onChange={(e) => {

                          //medhat
                          async function updateRate() {
                            await axios.patch(
                              `/games/update/${game._id}`,
                              {
                                rate: e.target.value,
                              }
                            );
                          }
                          updateRate();
                          setUpdateCouter((old) => old + 1);
                        }}
                      />
                    </div>
                  </div>
                  {/* medhat */}

                  <textarea
                    name="comment"
                    id="comment"
                    cols="50"
                    rows="2"
                    className="col-12 tasbet"
                    placeholder={t("Comment")}
                    defaultValue={game.comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                  <div className="text-center">
                    <button
                      className="btn btn-outline-dark text-center m-2"
                      onClick={() => {

                        //medhat
                        async function updateComment() {
                          await axios.patch(
                            `/games/update/${game._id}`,
                            {
                              comment: comment,
                            }
                          );
                          // console.log(rating)
                        }
                        updateComment();
                        alert("Added successfully")
                        setUpdateCouter((old) => old + 1);
                      }}>
                      {t("Add Review")}
                    </button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

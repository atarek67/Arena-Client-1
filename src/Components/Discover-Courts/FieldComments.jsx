//medhat
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { useTranslation } from 'react-i18next';
const FieldComments = ({ fieldId }) => {
  const [t, i18n] = useTranslation();
  const [games, setGames] = useState([]);
  const [Flag, setFlag] = useState(false)
  // const [showReviews, setshowReviews] = useState(false)
  useEffect(() => {
    async function getGames() {
      let { data } = await axios.get(
        `/games/field/${fieldId}`
      );
      setGames(data);
    }
    getGames();
  }, []);

  var booleanValue = games.filter((game) =>
    game.rate != "")
  console.log({ booleanValue })
  return (
    <>

      <section style={{ color: "#000", backgroundColor: "#f3f2f2", zIndex: "0" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-xl-8 text-center">
              <h3 className="fw-bold mb-4">{t("Players Reviews")}</h3>

            </div>
          </div>

          <div className="row text-center">
            {games?.map((game, index) => (


              !game.rate == "" ?
                // {setFlag(true)}
                <div key={index} className="col-md-4 mb-4 mb-md-0 pb-3 ">
                  <div className="card">
                    <div className="card-body py-4 mt-2">

                      <h5 className="font-weight-bold">{t("Player")}: {game.userFullName}</h5>
                      <div className="d-flex justify-content-center mb-4"></div>
                      <h6 className="font-weight-bold my-3">{t("Date")}: {game.date}</h6>
                      <Rating
                        name="read-only"
                        value={parseInt(game.rate)}
                        readOnly
                      />

                      {game.comment ?
                        <p className="mb-2">
                          <i className="fas fa-quote-left pe-2" />
                          {game.comment}
                        </p>
                        : null}
                    </div>
                  </div>
                </div> :
                ""
              // <span className="h4 text-center text-warning">There is no reviews yet</span>
            ))}
            {booleanValue.length === 0 &&
              <>
                <span className="h3 text-center text-success">There is no reviews yet</span>
              </>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default FieldComments;

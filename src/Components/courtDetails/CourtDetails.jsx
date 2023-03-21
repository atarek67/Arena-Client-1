
import React, { useState } from "react";
import { useLoaderData } from "react-router";
import style from "./courtDetails.module.css";
import axios from "axios";
import ReservationForm from "./ReservationForm";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from 'react-i18next';
export default function CourtDetails() {
  const image = "https://arena-server.onrender.com/api/images/fieldPic/";
  const [t, i18n] = useTranslation();
  let field = useLoaderData();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const api_url = "/fields"


  return (
    <>
      <div className={style.All}>
        {/* Carousel Section */}
        <Carousel activeIndex={index} onSelect={handleSelect} className="m-lg-5 m-1">
          {field.images?.map((i) => (
            <Carousel.Item>
              <img
                className="d-block w-100 b-danger img-fluid d-lg-block d-none"
                src={`${image}/${i}`}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className={style.cardBody}>
          <h4 className={style.cardTitle}>{t("Court Name")}: {field.fieldName}</h4>
          <br />
          <h5 className={style.cardTitle}>{t("Location")}: {field.location}</h5>
          <br />
          <h5 className={style.cardTitle}>{t("Price/Hour")}: {field.price} {t("EGP")}</h5>
        </div>

        <ReservationForm fieldId={field._id} fieldName={field.fieldName} price={field.price}></ReservationForm>
      </div>
    </>
  );
}

export async function courtLoader({ params }) {
  let { data } = await axios.get(
    `fields/${params.fieldID}`
  );

  return data;
}

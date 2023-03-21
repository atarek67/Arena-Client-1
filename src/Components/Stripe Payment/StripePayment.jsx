import axios from "axios";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { useTranslation } from 'react-i18next';

var key = true;
const StripePayment = () => {
  const [t, i18n] = useTranslation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();
  let gameToken = localStorage.getItem("game");
  let gameData = jwtDecode(gameToken);

  console.log(gameData.price);

  // Publish key
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51Mj0W7F5qmAr58x6ywoKNAGEtVtgaQJ3pmY2yvTRUJAT7sbx2uNb8DU7Rf51BR9MnMH4bvaz0Ly8ruc62Ph9tIEd00cSKHHMs1"
      )
    );
  }, []);

  useEffect(() => {
    axios
      .post(
        "/payment",
        { total: +gameData.price },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setClientSecret(data.data.clientSecret);
        console.log(data.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
    // change key
  }, []);

  return (
    <>
      <h4 className="text-center mt-5 text-success">{t("Please Fill Your Card")}</h4>
      <div className="container col-6">

        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripePayment;

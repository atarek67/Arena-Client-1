import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import jwtDecode from "jwt-decode";
import styles from "./CheckoutForm.module.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const CheckoutForm = () => {
  const [t, i18n] = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  let gameToken = localStorage.getItem("game");
  let gameData = jwtDecode(gameToken);

  // const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);


    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        //return_url: `${window.location.origin}/completion`,
        //create order
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Create Order Here
      await axios
        .post(`/games/add`, gameData)
        .catch((e) => {
          console.log(e);
        });
      localStorage.removeItem("game");
      navigate("/player-profile");
      alert("Paid succussfully")
    } else {
      window.alert("payment failed");
      localStorage.removeItem("game");
    }

    setIsProcessing(false);
  };

  return (
    <form className={styles.payment_form} onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className={styles.button_payment}
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span >{isProcessing ? "Processing ... " : t("Pay now")}</span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};

export default CheckoutForm;

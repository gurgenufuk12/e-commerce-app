import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm.tsx";

const CheckoutPage = () => {
  const stripePromise = loadStripe(
    "pk_test_51QCyKTCf0Tz7ZWccdWAtrDJaAFvyJRcgyFzinfausgNA7vcnPcMr6liT5lNr3ecqqMbp02hsDcupClSNHiHDWyXJ00pkfer30T"
  );
  return (
    <div className="mx-96 mt-10 justify-center flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Checkout Page</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

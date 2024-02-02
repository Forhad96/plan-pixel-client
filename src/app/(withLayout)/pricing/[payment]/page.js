"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutFrom";
import SubscriptionDetails from "./SubscriptionDetails";
import apiConnector from "@/hooks/useAxios";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Payment({ params }) {
  const planName = params.payment;
  const [clientSecret, setClientSecret] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const xios = apiConnector();
  React.useEffect(() => {

    const postData = async()=>{
      try {
        const res = await xios.post("/create-payment-intent", { plan: planName });
    
        setClientSecret(res.data.clientSecret);
        
      } catch (error) {
        
      }
    }
postData()
    // Create PaymentIntent as soon as the page loads
  }, [planName]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mx-auto shadow-2xl my-10 p-10">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div className="flex justify-evenly flex-wrap-reverse gap-5">
            <SubscriptionDetails planName={planName} />

            <CheckoutForm planName={planName} />
          </div>
        </Elements>
      )}
    </div>
  );
}

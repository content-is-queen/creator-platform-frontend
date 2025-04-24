"use client";

import { useEffect, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useUser } from "@/context/UserContext";

import API from "@/api/api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PK);

const Checkout = () => {
  const [options, setOptions] = useState({});
  const { user } = useUser();

  const getClientSecret = async () => {
    const {
      data: { clientSecret },
    } = await API.post("/payments/create-checkout-session", {
      role: user.role,
    });

    setOptions({ clientSecret });
  };

  useEffect(() => {
    void getClientSecret();
  }, []);
  return (
    <div id="checkout" className="py-8">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;

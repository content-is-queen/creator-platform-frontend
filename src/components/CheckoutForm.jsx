"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import API from "@/api/api";
import Button from "./Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PK_TEST);

const CheckoutForm = (className) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await API.post("/payments/create-checkout-session", {});

      if (response.status !== 200) {
        throw new Error("Failed to create checkout session front end");
      }

      const sessionId = response.data.id; // Extract session ID from response data

      const stripe = await stripePromise;

      // Redirect to the Stripe Checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw new Error("An error occurred during checkout");
      }

      // Call API to update user subscription status upon successful checkout
      const updateResponse = await API.post(
        `/auth/userSubscription/sCxCtR8YPfWyrZGVkwyzcTNcF5N2`,
        { subscribed: true }
      );

      // Add session id

      if (updateResponse.status === 200) {
        console.log("User subscription status updated successfully");
      } else {
        throw new Error("Failed to update user subscription status");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      as="button"
      type="button"
      onClick={handleClick}
      className={className}
    >
      {loading && <Button.Spinner />}Subscribe
    </Button>
  );
};

export default CheckoutForm;

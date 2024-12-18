"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@/context/UserContext";

import API from "@/api/api";
import Button from "./Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PK);

const CheckoutForm = ({ className, variant }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await API.post(
        "/payments/create-checkout-session",
        { role: user.role },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create checkout session");
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
      size="lg"
      variant={variant}
    >
      {loading && <Button.Spinner dark />}
      Upgrade to {user?.role} +
    </Button>
  );
};

export default CheckoutForm;

"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import API from "@/api/api";
import Button from "./Button";

import { useUser } from "@/context/UserContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PK_TEST);

const CancelSubscriptionForm = ({ className, variant }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await API.post("/payments/cancel-subscription", {
        user_id: user.uid,
      });
    } catch (error) {
      console.error("Cancel subscription  error:", error);
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
      Cancel subscription
    </Button>
  );
};

export default CancelSubscriptionForm;

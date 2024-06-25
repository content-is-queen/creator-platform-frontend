"use client";

import { useState } from "react";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/UserContext";

import Button from "./Button";

const CancelSubscriptionForm = ({
  className,
  variant,
  setError,
  setSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUser();
  const { token } = useAuth();

  const handleClick = async () => {
    setLoading(true);

    try {
      if (confirm("Are you sure you want to cancel your subscription?")) {
        const response = await API.post(
          "/payments/cancel-subscription",
          { userId: user.uid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setUser({ ...user, subscribed: false });
        setSuccess({ message: "Subscription cancelled successfuly" });
      }
    } catch (error) {
      console.error("Cancel subscription  error:", error);
      setError({
        message: "There was a problem cancelling your subscription",
      });
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

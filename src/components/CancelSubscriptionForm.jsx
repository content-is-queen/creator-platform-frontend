"use client";

import { useState } from "react";

import API from "@/api/api";
import Button from "./Button";

import { useUser } from "@/context/UserContext";

const CancelSubscriptionForm = ({ className, variant }) => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const handleClick = async () => {
    setLoading(true);

    try {
      if (confirm("Are you sure you want to cancel you subscription?")) {
        await API.post("/payments/cancel-subscription", {
          user_id: user.uid,
        });

        setUser({ ...user, subscribed: false });
      }
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

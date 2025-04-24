"use client";

import { useUser } from "@/context/UserContext";

import Button from "./Button";

const CheckoutForm = ({ className, variant }) => {
  const { user } = useUser();

  return (
    <Button href="/checkout" className={className} size="lg" variant={variant}>
      Upgrade to {user?.role} +
    </Button>
  );
};

export default CheckoutForm;



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51PEYUjA0tTttcwfymYaiJOk46eP4fcCNTJEvt9ihqaefcDDD3SmDSBKMygET1MA6VeseOF6PscXHvhIXc3sUQWm50026vNqpuz");

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const handleCheckout = async () => {
    setLoading(true);

    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: "price_id", quantity: 1 }],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        throw new Error("An error occurred during checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle error (e.g., display error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div>
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </Elements>
  );
};

export default CheckoutForm;

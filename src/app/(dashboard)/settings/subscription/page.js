"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";
import useToken from "@/hooks/useToken";
import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import CheckoutForm from "@/components/CheckoutForm";
import InfoCard from "@/components/InfoCard";
import Spinner from "@/components/Spinner";
import CancelSubscriptionForm from "@/components/CancelSubscriptionForm";

const Subscription = () => {
  const renewValue = "12th December";
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const token = useToken();
  const { user } = useUser();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { subscribed } = await API.get(
            `/auth/subscription/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSubscribed(subscribed);
          setLoading(false);
        } catch (error) {
          console.log(error.response.data.error);
        }
      })();
    }
  }, [token]);
  // TODO: check if user is subscribed
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        {loading ? (
          <div className="flex items-center h-80 justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <>
            <InfoCard title="Billing cycle end date" value={renewValue} />

            {subscribed ? (
              <CancelSubscriptionForm variant="white" />
            ) : (
              <CheckoutForm />
            )}
          </>
        )}
      </div>
    </Form>
  );
};

export default Subscription;

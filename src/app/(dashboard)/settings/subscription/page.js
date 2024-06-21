"use client";

import { format } from "date-fns";

import { useEffect, useState } from "react";
import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

import Form from "@/components/Form";
import CheckoutForm from "@/components/CheckoutForm";
import InfoCard from "@/components/InfoCard";
import Spinner from "@/components/Spinner";
import CancelSubscriptionForm from "@/components/CancelSubscriptionForm";

const Subscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const { token, subscribed } = useAuth();
  const getSubscriptionInfo = async () => {
    try {
      const {
        data: { subscriptionId },
      } = await API("/payments/info", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const {
        data: { subscription },
      } = await API(
        `/payments/subscription?subscription_id=${subscriptionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubscription(subscription);
    } catch (error) {
      console.log(error.response.data);
      setError({
        message: "We were unable to get your subscription information",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && subscribed) {
      getSubscriptionInfo();
    }
    setLoading(false);
  }, [token]);

  return (
    <Form
      error={error}
      setError={setError}
      setSuccess={setSuccess}
      success={success}
      className="mx-auto"
    >
      <div className="space-y-10">
        {loading ? (
          <div className="flex items-center h-80 justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <>
            {subscription?.current_period_end ? (
              <>
                <InfoCard title="Billing cycle end date">
                  {format(
                    new Date(subscription.current_period_end * 1000),
                    "PPPP"
                  )}
                </InfoCard>
                <CancelSubscriptionForm
                  setError={setError}
                  setSuccess={setSuccess}
                />
              </>
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

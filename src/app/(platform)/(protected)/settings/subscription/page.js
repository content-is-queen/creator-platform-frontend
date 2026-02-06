"use client";

import { format } from "date-fns";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import API from "@/api/api";
import useSubscribed from "@/hooks/useSubscribed";

import Form from "@/components/Form";
import Text from "@/components/Text";
import InfoCard from "@/components/InfoCard";
import Spinner from "@/components/Spinner";
import CancelSubscriptionForm from "@/components/CancelSubscriptionForm";

const Subscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const { subscribed, loading: checkingSubscribed } = useSubscribed();

  const getSubscriptionInfo = async () => {
    try {
      const {
        data: { subscriptionId },
      } = await API("/payments/info");

      const {
        data: { subscription },
      } = await API(`/payments/subscription?subscription_id=${subscriptionId}`);

      setSubscription(subscription);
    } catch (error) {
      console.error(error);
      setError({
        message: "We were unable to get your subscription information",
      });
    }
  };

  useEffect(() => {
    if (subscribed) {
      getSubscriptionInfo();
    }
  }, [checkingSubscribed, subscribed]);

  if (!checkingSubscribed && !subscribed) {
    return notFound();
  }

  return (
    <Form
      error={error}
      setError={setError}
      setSuccess={setSuccess}
      success={success}
      className="mx-auto"
    >
      <div className="space-y-10">
        {checkingSubscribed ? (
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
                {subscription.cancel_at_period_end ? (
                  <Text>
                    Your subscription will cancel at the end of your billing
                    cycle
                  </Text>
                ) : (
                  <CancelSubscriptionForm
                    setError={setError}
                    setSuccess={setSuccess}
                  />
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </Form>
  );
};

export default Subscription;

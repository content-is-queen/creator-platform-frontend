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
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import moment from "moment";

const Subscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const token = useToken();
  const { user } = useUser();

  const getSubscriptionInfo = async (subscriptionId) => {
    if (subscription) return;
    try {
      const {
        data: { subscription },
      } = await API(`/payments/subscription?subscription_id=${subscriptionId}`);
      setSubscription(subscription);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      user?.subscriptionId && getSubscriptionInfo(user.subscriptionId);
    }
    setLoading(false);
  }, [token]);

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        {loading ? (
          <div className="flex items-center h-80 justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <>
            {subscription ? (
              <>
                <InfoCard title="Billing cycle end date">
                  <>{moment(subscription.current_period_end).calendar()}</>
                </InfoCard>
                <CancelSubscriptionForm />
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

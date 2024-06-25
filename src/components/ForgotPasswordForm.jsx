"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "@/api/api";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Success, Error } from "@/components/Form";

const FIELDS = [
  {
    name: "email",
    type: "email",
    children: "Email Address",
    rules: {
      required: "Email address is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  },
];

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError({});
    setSuccess({});
    setLoading(true);
    try {
      const response = await API.post("/auth/forgot", data);

      if (response.status === 200) {
        setSuccess({
          message: "Please check your email for password reset instructions.",
        });
        return;
      }

      throw new Error("Something went wrong. Try again");
    } catch (error) {
      setError({
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Text className="!mt-4">
        Enter your email and we’ll send you a link to reset your password
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {FIELDS.map(({ children, name, ...otherProps }) => (
            <AuthInputController
              key={name}
              control={control}
              errors={formErrors}
              name={name}
              {...otherProps}
            >
              {children}
            </AuthInputController>
          ))}
        </div>
        <Button as="button" type="submit" className="mt-8">
          {loading && <Button.Spinner />}
          Send password recovery link
        </Button>
      </form>
      {error?.message && <Error>{error.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default ForgotPasswordForm;

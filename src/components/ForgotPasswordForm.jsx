"use client";

import { useState } from "react";
import useToken from "@/hooks/useToken";
import { useForm } from "react-hook-form";
import API from "@/api/api";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInput from "@/components/AuthInput";
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
  const { token } = useToken();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});

  const onSubmit = async (data) => {
    setError({});
    setSuccess({});
    try {
      const response = await API(`/auth/reset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.message === "Password reset email sent successfully") {
        setSuccess({
          message: "Please check your email for password reset instructions.",
        });
        return;
      }
      if (response.status > 200) {
        setError({
          message: "Something went wrong. User sign up failed.",
        });
        return;
      }
      return response;
    } catch (error) {
      setError({
        message: error.message || "Something went wrong. User sign up failed.",
      });
      console.error("Sign up error:", error);
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
            <AuthInput
              key={name}
              control={control}
              errors={formErrors}
              name={name}
              {...otherProps}
            >
              {children}
            </AuthInput>
          ))}
        </div>
        <Button as="button" type="submit" className="mt-8">
          send password recovery link
        </Button>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default ForgotPasswordForm;

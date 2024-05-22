"use client";

import { useState } from "react";
import useToken from "@/hooks/useToken";
import { useForm } from "react-hook-form";
import API from "@/api/api";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Success, Error } from "@/components/Form";
import axios from "axios";

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/v1/auth/forgot`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message === 'Password reset email sent successfully') {
        setSuccess({
          message: 'Please check your email for password reset instructions.',
        });
        return;
      }

      if (response.data.status > 200) {
        setError({
          message: 'Something went wrong. try again.',
        });
        return;
      }

      return response.data;
    } catch (error) {
      setError({
        message: error.response?.data?.message || 'Something went wrong. User sign up failed.',
      });
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
          send password recovery link
        </Button>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default ForgotPasswordForm;

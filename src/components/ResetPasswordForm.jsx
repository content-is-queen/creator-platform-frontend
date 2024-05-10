"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInput from "@/components/AuthInput";

import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import { useState } from "react";
import useToken from "@/hooks/useToken";

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
  }
];

const ResetPasswordForm = () => {
  const { token } = useToken();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [errorss, setError] = useState({});

  const onSubmit = async (data) => {
    console.log(data);
    setError({});
    try {
      const response = await API(`/auth/reset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status > 200) {
        setError({
          message: "Something went wrong. User sign up failed.",
        });
        return;
      }
      return response;
    } catch (error) {
      setError({
        message: "Something went wrong. User sign up failed.",
      });
      console.error("Sign up error:", error);
    }


  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
      <Text size="sm" className="!mt-2">
      Enter your email and we’ll send you a link to reset your password
        </Text>
        {FIELDS.map(({ children, name, ...otherProps }) => (
          <AuthInput
            key={name}
            control={control}
            errors={errors}
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
    {errorss?.message && (
      <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
        <p>{errorss.message}</p>
      </div>
    )}
    </>
  );
};

export default ResetPasswordForm;

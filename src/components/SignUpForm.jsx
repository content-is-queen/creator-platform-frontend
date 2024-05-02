"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInput from "@/components/AuthInput";
import Tabs from "@/components/Tabs";

import useAuth from "@/hooks/useAuth";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { signup } = useAuth();

  const OPTIONS = [
    {
      label: "Creator",
      id: "creator",
      fields: [
        {
          name: "first_name",
          type: "text",
          children: "First Name",
        },
        {
          name: "last_name",
          type: "text",
          children: "Last Name",
        },
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
        {
          name: "password",
          type: "password",
          children: "Password",
          rules: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
      ],
    },
    {
      label: "Brand",
      id: "brand",
      fields: [
        {
          name: "first_name",
          type: "text",
          children: "First Name",
        },
        {
          name: "last_name",
          type: "text",
          children: "Last Name",
        },
        {
          name: "organization_name",
          type: "text",
          children: "Organization",
        },
        {
          name: "email",
          type: "email",
          children: "Email Address",
        },
        {
          name: "password",
          type: "password",
          children: "Password",
          rules: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
      ],
    },
  ];

  const [active, setActive] = useState(OPTIONS[0]);

  useEffect(() => {
    clearErrors();
  }, [active]);

  const onSubmit = async (data, role) => {
    signup(data, role);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Tabs options={OPTIONS} active={active} setActive={setActive} />
      </div>

      <div className="space-y-6">
        {active.fields.map(({ children, name, ...otherProps }) => (
          <AuthInput
            key={name}
            name={name}
            control={control}
            errors={errors}
            {...otherProps}
          >
            {children}
          </AuthInput>
        ))}
      </div>

      <Button as="button" type="submit" className="mt-8">
        Create Account
      </Button>

      <Text size="sm" className="mt-4">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-queen-blue">
          Login
        </Link>
      </Text>
    </form>
  );
};

export default SignUpForm;

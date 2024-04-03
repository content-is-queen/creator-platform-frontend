"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import Tabs from "@/components/Tabs";
import API from "@/api/api";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();

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

  const router = useRouter();

  const [active, setActive] = useState(OPTIONS[0]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    clearErrors();
  }, [active]);

  const handleBrandSignup = async (formData) => {
    try {
      await API.post("/auth/signup/brand", formData);
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || error.message || "Try again");
    }
  };

  const onSubmit = async (data) => {
    if (active.id === "creator") {
      try {
        await API.post("/auth/signup/creator", data);
        router.push("/login");
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          error.response.data.message || error.message || "Try again"
        );
      }
    }
  };

  return (
    <>
      <Heading>Sign up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Tabs options={OPTIONS} active={active} setActive={setActive} />
        </div>

        <div className="space-y-6">
          {active.fields.map(({ children, name, ...otherProps }) => (
            <Input
              key={name}
              name={name}
              control={control}
              errors={errors}
              {...(active.id === "creator"
                ? { control: control }
                : {
                    value: formData[name],
                    onChange: (e) =>
                      setFormData({
                        ...formData,
                        [name]: e.target.value,
                      }),
                  })}
              {...otherProps}
            >
              {children}
            </Input>
          ))}
        </div>

        <Button
          as="button"
          type={active.id === "creator" ? "submit" : "button"}
          className="mt-8"
          {...(active.id === "brand"
            ? { onClick: () => handleBrandSignup(formData) }
            : {})}
        >
          Create Account
        </Button>

        <Text size="sm" className="mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-queen-blue">
            Login
          </Link>
        </Text>
      </form>
    </>
  );
};

export default SignUp;

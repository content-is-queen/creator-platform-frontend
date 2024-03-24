"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

<<<<<<< HEAD
import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";

import { db } from "@/firebase/firebase";
=======
import { auth, db } from "@/firebase/firebase";
>>>>>>> aea4a1c (ft(Profile):)
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useForm, useWatch } from "react-hook-form";

import AuthTemplate from "@/components/AuthTemplate";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input, { inputStyles } from "@/components/Input";
import Heading from "@/components/Heading";
import Tabs from "@/components/Tabs";
import Secure from "@/utils/SecureLs";
import clsx from "clsx";
import API from "@/api/api";

const SignUp = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    clearErrors,
  } = useForm();
  const password = useWatch({ control, name: "password" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

const handleBrandSignup =async (formData) =>{
  try {
    setIsSigningIn(true);
    await API.post("/auth/signup/brand", formData );
    router.push('/login');
} catch (error) {
    console.error("Error:", error);
    toast.error(error.response.data.message || error.message || "Try again");
} finally {
    setIsSigningIn(false);
}
}
  const OPTIONS = [
    {
      label: "Brand",
      id: "brand",
      fields: [
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
        {
          name: "confirm_password",
          type: "password",
          children: "Confirm Password",
        },
      ],
    },
    {
      label: "Creator",
      id: "creator",
      fields: [
        {
          name: "podcast_name",
          type: "text",
          children: "Podcast Name",
          other: {
            ...register("podcast_name", {
              required: "Podcast name is required",
            }),
          },
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
        {
          name: "confirm_password",
          type: "password",
          children: "Confirm Password",
        },
      ],
    },
  ];

  const [active, setActive] = useState(OPTIONS[1]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { login } = useUserProfile();

  useEffect(() => {
    clearErrors();
  }, [active]);

  useEffect(() => {}, [active, password]);

  const onSubmit = async (data) => {
    if (active.id === "creator") {
      try {
        setIsSigningIn(true);
        await API.post("/auth/signup/creator", data );
        router.push('/login');
    } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.message || error.message || "Try again");
    } finally {
        setIsSigningIn(false);
    }
    } 
};

  return (
    <AuthTemplate>
      <Heading>Sign up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Tabs options={OPTIONS} active={active} setActive={setActive} />
        </div>

        <div className="space-y-6">
          {active.fields.map(({ children, name, ...otherProps }, index) => (
            <Input
              key={`${name}-${index}`}
              name={name}
              control={control}
              errors={errors}
              {...otherProps}
            >
              {children}
            </Input>
          ))}
        </div>

        {active.id === "creator" && (
          <Button tag="button" type="submit" className="mt-8">
            {isSigningIn ? "Signing up..." : "Sign up"}
          </Button>
        )}
        {active.id === "brand" && (
          <Button
            tag="button"
            type="button"
            className="mt-8"
            onClick={() => handleBrandSignup(formData)}
          >
            {isSigningIn ? "Signing up..." : "Sign up"}
          </Button>
        )}
        <Text size="sm" className="mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-queen-blue">
            Login
          </Link>
        </Text>
      </form>
    </AuthTemplate>
  );
};

export default SignUp;

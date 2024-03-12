"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { db } from "@/firebase/firebase";
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { useForm, useWatch } from "react-hook-form";

import AuthTemplate from "@/components/AuthTemplate";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import Tabs from "@/components/Tabs";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const password = useWatch({ control, name: "password" });

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
          rules: {
            validate: (value) => value === password || "Passwords do not match",
          },
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
          rules: {
            validate: (value) => value === password || "Passwords do not match",
          },
        },
      ],
    },
  ];

  const [active, setActive] = useState(OPTIONS[0]);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {}, [active]);

  const onSubmit = async (data) => {
    try {
      setIsSigningIn(true);
      const { user } = await doCreateUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const brandDocRef = doc(db, "brand", user.uid);

      console.log("Brand Doc Ref:", brandDocRef.path);

      // Create a 'profile' subcollection within the 'brand' document
      const profileCollectionRef = collection(brandDocRef, "profile");

      // Add a document to the 'profile' subcollection with podcast_name field
      const docRef = await addDoc(profileCollectionRef, {
        podcast_name: data.podcast_name,
      });

      console.log("Profile added successfully. Document ID:", docRef.id);

      setIsSigningIn(false);
      window.location.href = "/login";
    } catch (error) {
      const errorMessageWithoutFirebase = error.message.replace(
        /firebase: /i,
        ""
      );
      toast.error(errorMessageWithoutFirebase || "Try again!");
      console.log(error);
    } finally {
      setIsSigningIn(false);
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
          {active.fields.map(({ children, ...otherProps }) => (
            <Input control={control} errors={errors} {...otherProps}>
              {children}
            </Input>
          ))}
        </div>

        <Button tag="button" type="button" className="mt-8">
          {isSigningIn ? "Signing up..." : "Sign up"}
        </Button>
        <Text size="sm" className="mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium">
            Login
          </Link>
        </Text>
      </form>
    </AuthTemplate>
  );
};

export default SignUp;

"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";

import { db } from "@/firebase/firebase";
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
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
    clearErrors,
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
    const { podcast_name } = data;
    console.log(active.id, data, "Yoooooooooooooooooooooooooooooooo");
    if (active.id === "creator") {
      try {
        setIsSigningIn(true);
        const { user } = await doCreateUserWithEmailAndPassword(
          data.email,
          data.password
        );

        const usersCollectionRef = collection(db, "users");
        const brandDocRef = doc(usersCollectionRef, "creator");
        const brandDocSnapshot = await getDoc(brandDocRef);
        if (!brandDocSnapshot.exists()) {
          await setDoc(brandDocRef, {});
        }
        const usersBrandCollectionRef = collection(brandDocRef, "users");
        await addDoc(usersBrandCollectionRef, { uid: user.uid, podcast_name });
      } catch (error) {
        console.error("Error:", error);
        const errorMessageWithoutFirebase = error.message.replace(
          /firebase: /i,
          ""
        );
        toast.error(errorMessageWithoutFirebase || "Try again!");
      } finally {
        setIsSigningIn(false);
      }
    } else {
      try {
        setIsSigningIn(true);
        const { user } = await doCreateUserWithEmailAndPassword(
          data.email,
          data.password
        );

        const usersCollectionRef = collection(db, "users");
        const brandDocRef = doc(usersCollectionRef, "creator");
        const brandDocSnapshot = await getDoc(brandDocRef);
        if (!brandDocSnapshot.exists()) {
          await setDoc(brandDocRef, {});
        }
        const usersBrandCollectionRef = collection(brandDocRef, "users");
        await addDoc(usersBrandCollectionRef, { uid: user.uid, podcast_name });
      } catch (error) {
        console.error("Error:", error);
        const errorMessageWithoutFirebase = error.message.replace(
          /firebase: /i,
          ""
        );
        toast.error(errorMessageWithoutFirebase || "Try again!");
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

        <Button tag="button" type="submit" className="mt-8">
          {isSigningIn ? "Signing up..." : "Sign up"}
        </Button>
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

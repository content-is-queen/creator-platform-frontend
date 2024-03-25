"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";

import { doSignInWithEmailAndPassword } from "@/firebase/auth";

import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
];

const Login = () => {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { login, userProfile } = useUserProfile();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        const { user } = await doSignInWithEmailAndPassword(
          data.email,
          data.password
        );

        const { email, photoURL } = user;

        login(user);
      }
    } catch (error) {
      const errorMessageWithoutFirebase = error.message.replace(
        /firebase: /i,
        ""
      );
      toast.error(errorMessageWithoutFirebase || "Failled try again");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      {" "}
      <Heading>Welcome back</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {FIELDS.map(({ children, name, ...otherProps }) => (
            <Input
              key={name}
              control={control}
              errors={errors}
              name={name}
              {...otherProps}
            >
              {children}
            </Input>
          ))}
          <Text size="sm" className="!mt-2">
            <Link href="#">Forgot password?</Link>
          </Text>
        </div>
        <Button as="button" type="submit" className="mt-8">
          {isSigningIn ? "SIGNING IN..." : "SIGN IN"}{" "}
        </Button>
        <Text size="sm" className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-queen-blue">
            Signup
          </Link>
        </Text>
      </form>
    </>
  );
};

export default Login;

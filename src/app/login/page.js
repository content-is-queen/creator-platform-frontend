"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { doSignInWithEmailAndPassword } from "@/firebase/auth";
import Secure from "@/utils/SecureLs";

import Heading from "@/components/Heading";
import AuthTemplate from "@/components/AuthTemplate";
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
  const [isSigningIn, setIsSigningIn] = useState(false);
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
        const token = await user.getIdToken();
        Secure.setToken(token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      const errorMessageWithoutFirebase = error.message.replace(
        /firebase: /i,
        ""
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <AuthTemplate>
      <Heading>Welcome back</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {FIELDS.map(({ children, ...otherProps }) => (
            <Input control={control} errors={errors} {...otherProps}>
              {children}
            </Input>
          ))}
          <Text size="sm" className="!mt-2">
            <Link href="#">Forgot password?</Link>
          </Text>
        </div>
        <Button tag="button" type="submit" className="mt-8">
          {isSigningIn ? "SIGNING IN..." : "SIGN IN"}{" "}
        </Button>
        <Text size="sm" className="mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium">
            Signup
          </Link>
        </Text>
      </form>
    </AuthTemplate>
  );
};

export default Login;

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInput from "@/components/AuthInput";

import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/UserContext";

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

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [errors, setError] = useState({});

  const router = useRouter();
  const { signin } = useAuth();
  const { user } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await signin(data.email, data.password);

      if (response.status === 500) {
        setError({
          message: response.message,
        });
        return;
      }

      if (response.status > 200) {
        setError({
          message: "Something went wrong. User sign up failed.",
        });
        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
          <Text size="sm" className="!mt-2">
            <Link href="/reset-password">Forgot password?</Link>
          </Text>
        </div>
        <Button as="button" type="submit" className="mt-8">
          Sign in
        </Button>
        <Text size="sm" className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-queen-blue">
            Sign up
          </Link>
        </Text>
      </form>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
    </>
  );
};

export default LoginForm;

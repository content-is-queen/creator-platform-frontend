"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Error } from "@/components/Form";

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

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const returnTo = searchParams.get("returnTo");

  const onSubmit = async (data) => {
    setLoading(true);
    setError({});
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace(returnTo || "/");
    } catch (error) {
      console.error(error.message);
      setLoading(false);

      if (error.code === "auth/invalid-credential") {
        setError({
          message: "Login failed: Your email or password is incorrect",
        });
      } else if (error.code === "auth/user-disabled") {
        setError({
          message:
            "Login failed: Your account has been disabled. Please contact support@contentisqueen.org if you think this was a mistake",
        });
      } else {
        setError({
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
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
          <Text size="sm" className="!mt-2">
            <Link
              href="/forgot-password"
              className="text-queen-black/70 hover:text-queen-blue"
            >
              Forgot password?
            </Link>
          </Text>
        </div>
        <Button as="button" type="submit" className="mt-8">
          {loading && <Button.Spinner />}
          Sign in
        </Button>
        <Text size="sm" className="mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
            className="font-medium text-queen-black/70 hover:text-queen-blue"
          >
            Sign up
          </Link>
        </Text>
      </form>
      {error?.message && <Error>{error.message}</Error>}
    </>
  );
};

export default LoginForm;

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, messaging } from "@/firebase.config";
import { saveTokenToServer } from "@/context/UserContext";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Error } from "@/components/Form";
import { getToken } from "firebase/messaging";

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

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError({});
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;
      const VITE_APP_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      const fcmToken = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      const data = {
        fcmToken,
        userId: user.uid,
      };
      await saveTokenToServer(data);
      router.push("/");
    } catch (error) {
      console.error(error);

      if (error.code === 400) {
        setError({ message: "Your login credentials are incorrect" });
      } else
        setError({
          message: "Something went wrong when signing in",
        });
    } finally {
      setLoading(false);
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
            <Link href="/forgot-password">Forgot password?</Link>
          </Text>
        </div>
        <Button as="button" type="submit" className="mt-8">
          {loading && <Button.Spinner />}
          Sign in
        </Button>
        <Text size="sm" className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-queen-blue">
            Sign up
          </Link>
        </Text>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
    </>
  );
};

export default LoginForm;

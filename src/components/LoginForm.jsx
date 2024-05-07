"use client";

import Link from "next/link";
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
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { signin } = useAuth();
  const { user } = useUser();

  const onSubmit = async (data) => {
    try {
      await signin(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {FIELDS.map(({ children, name, ...otherProps }) => (
          <AuthInput
            key={name}
            control={control}
            errors={errors}
            name={name}
            {...otherProps}
          >
            {children}
          </AuthInput>
        ))}
        <Text size="sm" className="!mt-2">
          <Link href="#">Forgot password?</Link>
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
  );
};

export default LoginForm;

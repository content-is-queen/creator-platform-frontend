"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { doSignInWithEmailAndPassword } from "@/firebase/auth";
// import useAuth from "@/hooks/useAuth";

import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Secure from "@/utils/SecureLs";
import isAuth from "@/helpers/isAuth";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/features/profile/authSlice";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
        setIsSigningIn(true);
        const { user } = await doSignInWithEmailAndPassword(
          data.email,
          data.password
        );

        const token = await user.getIdToken(/* forceRefresh */ true);
        await Secure.setToken(token);
        const loggedUser = isAuth();
        if(loggedUser){
          await dispatch(login({loggedUser, token}))
          router.push("/");
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
          {isSigningIn ? " Loading ... " : " Sign In "}
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

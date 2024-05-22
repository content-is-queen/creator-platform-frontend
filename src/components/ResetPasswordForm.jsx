"use client";

import { useState, useEffect } from "react";
import useToken from "@/hooks/useToken";
import { useForm } from "react-hook-form";
import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Success, Error } from "@/components/Form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
const FIELDS = [
  {
    name: "password",
    type: "password",
    children: "Password",
    rules: {
      required: "Password is required",
      pattern: {
        value: /^.{8}$/,
        message: "Password must be exactly 8 characters long",
      },
    },
  },
];

const ResetPasswordForm = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const router = useRouter();
  const { token } = useToken();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

useEffect(() => {
  if (tokenParam) {
   let data = parseJwt(tokenParam);
   setDecodedToken(data);
  }
}, [tokenParam]);

  const onSubmit = async (data) => {
    setError({});
    setSuccess({});
    if(decodedToken !== null){
      const {uid} = decodedToken;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/v1/auth/reset`,
          {...data,uid},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.status === 200) {
          setSuccess({
            message: 'Password changed successfully.',
          });
          router.push("/login");
          return;
        }

        if (response.data.status > 200) {
          setError({
            message: 'Something went wrong. try again.',
          });
          return;
        }

        return response.data;

      } catch (error) {
        setError({
          message: error.response?.data?.message || 'Something went wrong.',
        });
      }
    }
  };

  return (
    <>
      <Text className="!mt-4">Enter new Password</Text>
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
        </div>
        <Button as="button" type="submit" className="mt-8">
          Send new password
        </Button>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default ResetPasswordForm;

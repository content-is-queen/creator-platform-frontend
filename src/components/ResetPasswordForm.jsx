"use client";

import { useState, useEffect } from "react";
import API from "@/api/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Success, Error } from "@/components/Form";

const FIELDS = [
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

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm();

  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    if (tokenParam) {
      let data = parseJwt(tokenParam);
      setToken(data);
    }
  }, [tokenParam]);

  const onSubmit = async (data) => {
    setError({});
    setSuccess({});
    setLoading(true);
    if (token) {
      const { uid } = token;
      try {
        const response = await API.post(
          "/auth/reset",
          { ...data, uid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === 200) {
          setSuccess({
            message: "Password changed successfully.",
          });
          router.push("/login");
          return;
        }

        if (response.data.status > 200) {
          setError({
            message: "Something went wrong. try again.",
          });
          return;
        }

        return response.data;
      } catch (error) {
        setError({
          message: error.response?.data?.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Text className="!mt-4">Enter new Password</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {FIELDS.map(({ name, children, rules }) => (
            <AuthInputController
              key={name}
              control={control}
              name={name}
              rules={rules}
              errors={formErrors}
            >
              {children}
            </AuthInputController>
          ))}
        </div>
        <Button as="button" type="submit" className="mt-8">
          {loading && <Button.Spinner />}
          Change password
        </Button>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default ResetPasswordForm;

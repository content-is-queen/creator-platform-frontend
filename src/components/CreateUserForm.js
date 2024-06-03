"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Error, Success } from "@/components/Form";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const FIELDS = [
  {
    name: "first_name",
    type: "text",
    children: "First Name",
    rules: {
      required: "First name is required",
    },
  },
  {
    name: "last_name",
    type: "text",
    children: "Last Name",
    rules: {
      required: "Last name is required",
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

const CreateUserForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const { token } = useToken();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError({});
    setSuccess({});
    try {
      const response = await API.post("/admin/users", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSuccess({
          message: "New user created successfully",
        });
      } else {
        return setError({
          message:
            response.data.message || error?.message || "Something went wrong",
        });
      }
    } catch (error) {
      setError({
        message:
          error.response.data.message ||
          error?.message ||
          "Something went wrong",
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
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
          {loading && <Button.Spinner />}
          Register
        </Button>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
};

export default CreateUserForm;

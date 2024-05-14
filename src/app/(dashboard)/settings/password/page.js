"use client";

import { useState } from "react";
import Form from "@/components/Form";
import Button from "@/components/Button";
import useToken from "@/hooks/useToken";
import API from "@/api/api";

const Password = () => {
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
  });
  const { token } = useToken();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess({});
    if (formData.old_password === formData.password) {
      setError({
        message: "You cannot use the same password as before",
      });
      return;
    }
    try {
      const response = await API(`/auth/password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response?.status === 200) {
        setSuccess({
          message: "Password update successfully",
        });
        return;
      } else {
        setError({
          message:
            response.message || "Something went wrong. User sign up failed.",
        });
        return;
      }
      return response;
    } catch (error) {
      setError({
        message: error.message || "Something went wrong. User sign up failed.",
      });
    }
  };

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="old_password"
          type="password"
          value={formData.old_password}
          onChange={handleChange}
        >
          Old Password
        </Form.Input>

        <Form.Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        >
          Password
        </Form.Input>

        <Button type="submit" as="button" onClick={handleSubmit}>
          Update Password
        </Button>
      </div>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
      {success?.message && (
        <div className="border border-green-700 bg-green-100 text-green-700 text-sm mt-4 py-2 px-4">
          <p>{success.message}</p>
        </div>
      )}
    </Form>
  );
};

export default Password;

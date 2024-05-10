"use client";

import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useState } from "react";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const General = () => {
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [errorss, setError] = useState({});
  const [success, setSuccess] = useState({});

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError({});
    setSuccess({});
    try {
      const response = await API("/auth/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setUser({ ...user, username: formData.username,  email: formData.email });
      console.log("response",response);
      if (response.status === 200) {
        setSuccess({
          message: "Settings updated successfully",
        });
        return;
      }
      return response;
    } catch (error) {
        setError({
          message: error?.message || "Something went wrong. User sign up failed.",
        });
        return;

    }
  };
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="username" value={formData.username} onChange={handleChange}>
          Username
        </Form.Input>

        <Form.Input name="email" value={formData.email} onChange={handleChange}>
          Email
        </Form.Input>

        <Button type="submit" as="button" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
      {errorss?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errorss.message}</p>
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

export default General;
